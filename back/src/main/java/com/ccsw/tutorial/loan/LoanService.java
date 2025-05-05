package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LoanService {

    /**
     * Método para recuperar todos los prestamos
     *me lo explicas?
     * @return {@link List} de {@link Client}
     */
    List<Loan> findAll();

    /**
     * Método para recuperar un listado paginado de {@link Loan}
     *
     * @param dto dto de búsqueda
     * @return {@link Page} de {@link Loan}
     */
    Page<Loan> findPage(LoanSearchDto dto);

    /**
     * Recupera una {@link Loan} a partir de su ID
     *
     * @param id PK de la entidad
     * @return {@link Loan}
     */
    Loan get(Long id);

    /**
     * Método para crear  o modificar un préstamo
     *
     * @param dto datos de la entidad

     */
    Loan save(LoanDto dto);

    /**
     * Método para modificar  un préstamo
     *
     * @param id y dto datos de la entidad
     */

    void delete(Long id) throws Exception;

}
