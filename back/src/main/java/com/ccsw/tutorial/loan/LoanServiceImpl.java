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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

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

    @Override
    public List<Loan> findAll() {
        return (List<Loan>) loanRepo.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<Loan> findPage(LoanSearchDto dto) {
        Specification<Loan> spec = Specification.where(null);
        if (dto.getGame() != null) {
            spec = spec.and(new LoanSpecification(new SearchCriteria("game.id", ":", dto.getGame())));
        }
        if (dto.getClient() != null) {
            spec = spec.and(new LoanSpecification(new SearchCriteria("client.id", ":", dto.getClient())));
        }

        if (dto.getDate() != null) {
            spec = spec.and(new LoanSpecification(new SearchCriteria("date", "between", dto.getDate())));
        }

        return loanRepo.findAll(spec, dto.getPageable().getPageable());
    }

    @Override
    public Loan get(Long id) {
        return loanRepo.findById(id).orElse(null);
    }

    @Override
    public Loan save(LoanDto loanDto) {

        Loan loan;
        loan = new Loan();

        BeanUtils.copyProperties(loanDto, loan, "id", "Game", "Client");
        loan.setGame(gameService.get(loanDto.getGame().getId()));
        loan.setClient(clientService.get(loanDto.getClient().getId()));

        // Validar que las fechas no sean nulas y tengan como máximo 14 días de diferencia
        if (loan.getDate1() == null || loan.getDate2() == null) {
            throw new IllegalArgumentException("Las fechas no pueden ser nulas.");
        }
        long diffInMillies = Math.abs(loan.getDate2().getTime() - loan.getDate1().getTime());
        long diffDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        if (diffDays > 14) {
            throw new IllegalArgumentException("La diferencia entre las fechas no puede ser mayor a 14 días.");
        }

        // Validar que el cliente no tenga más de un préstamo en el rango de fechas especificado
        long loanCountInDateRange = loanRepo.countByClientIdAndDateRange(loan.getClient().getId(), loan.getDate1(), loan.getDate2());
        if (loanCountInDateRange >= 1) {
            throw new IllegalArgumentException("El cliente ya tiene un préstamo en el rango de fechas especificado.");
        }

        // Validar que el juego no esté prestado en las fechas indicadas
        boolean isGameLoaned = loanRepo.existsByGameIdAndDateRange(loan.getGame().getId(), loan.getDate1(), loan.getDate2());
        if (isGameLoaned) {
            throw new IllegalArgumentException("El juego ya está prestado en las fechas indicadas.");
        }

        return this.loanRepo.save(loan);
    }

    @Override
    public void delete(Long id) throws Exception {
        if (this.loanRepo.findById(id).orElse(null) == null) {
            throw new Exception("Not exists");
        }

        this.loanRepo.deleteById(id);
    }

}




