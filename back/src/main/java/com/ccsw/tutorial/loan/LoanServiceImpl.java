package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepo;

    @Override
    public List<Loan> getAll() {
        return (List<Loan>) loanRepo.findAll();
    }

    @Override
    public Loan get(Long id) {
        return loanRepo.findById(id).orElse(null);
    }

    @Override
    public Page<Loan> findPage(LoanDto loan) {
        return null;
    }

    @Override
    public Loan save(LoanDto loan) {
        return null;
    }

    @Override
    public Loan save2(Long id, LoanDto loan) {
        return null;
    }

    @Override
    public int delete(Long id) throws Exception {
        return 0;
    }
}
