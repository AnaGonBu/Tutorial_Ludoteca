package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.ClientService;
import com.ccsw.tutorial.common.criteria.SearchCriteria;
import com.ccsw.tutorial.game.GameService;
import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;
import com.ccsw.tutorial.loan.model.LoanSpecification;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ClientService clientService;

    @Autowired
    private GameService gameService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<Loan> findPage(LoanSearchDto dto) {

        return loanRepo.findAll(dto.getPageable().getPageable());
    }

    @Override
    public List<Loan> getAll() {
        return (List<Loan>) loanRepo.findAll();
    }

    @Override
    public Loan get(Long id) {
        return loanRepo.findById(id).orElse(null);
    }

    @Override
    public Loan save(Long id, LoanDto loanDto) {

        Loan loan;

        if (id == null) {
            loan = new Loan();
        } else {
            loan = this.loanRepo.findById(id).orElse(null);
        }

        BeanUtils.copyProperties(loanDto, loan, "id", "Game", "Client");
        loan.setGame(gameService.get(loanDto.getGame().getId()));
        loan.setClient(clientService.get(loanDto.getClient().getId()));
        return this.loanRepo.save(loan);
    }

    @Override
    public int delete(Long id) throws Exception {
        return 0;
    }

    @Override
    @EntityGraph(attributePaths = { "game", "client" })
    public List<Loan> find(Long idGame, Long idClient) {

        LoanSpecification gameSpec = new LoanSpecification(new SearchCriteria("game.id", ":", idGame));
        LoanSpecification clientSpec = new LoanSpecification(new SearchCriteria("client.id", ":", idClient));

        Specification<Loan> spec = Specification.where(gameSpec).and(clientSpec);

        return this.loanRepo.findAll(spec);
    }
}


