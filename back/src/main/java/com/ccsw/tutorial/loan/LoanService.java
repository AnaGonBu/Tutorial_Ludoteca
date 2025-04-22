package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LoanService {

    /**
     * Método para recuperar todos los préstamos
     *
     * @return {@link Loan} de {@link Loan}
     */
    List<Loan> getAll();

    /**
     * Recupera una {@link Loan} a partir de su ID
     *
     * @param id PK de la entidad
     * @return {@link Loan}
     */
    Loan get(Long id);

    Page<Loan> findPage(LoanDto loan);

    /**
     * Método para crear  un préstamo
     *
     * @param dto datos de la entidad
     */
    Loan save(LoanDto dto);

    /**
     * Método para modificar  un préstamo
     *
     * @param id y dto datos de la entidad
     */
    Loan save2(Long id, LoanDto dto);

    /**
     * Método para eliminar  un préstamo
     *
     * @param id y dto datos de la entidad
     */
    int delete(Long id) throws Exception;
}
