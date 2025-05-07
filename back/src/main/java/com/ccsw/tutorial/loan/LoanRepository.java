package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.loan.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface LoanRepository extends CrudRepository<Loan, Long>, JpaSpecificationExecutor<Loan> {

    /**
     * Consulta para recuperar numero de prestamos por cliente en un rango de fechas {@link Loan}
     *
     * @param clientId Id cliente
     * @param date1 fecha inicio
     * @param date2 fecha fin
     * @return long de {@link Loan}
     */
    @Query("SELECT COUNT(l) FROM Loan l WHERE l.client.id = :clientId AND " + "(:date1 BETWEEN l.date1 AND l.date2 OR :date2 BETWEEN l.date1 AND l.date2 OR " + "l.date1 BETWEEN :date1 AND :date2 OR l.date2 BETWEEN :date1 AND :date2)")
    long countByClientIdAndDateRange(@Param("clientId") Long clientId, @Param("date1") Date date1, @Param("date2") Date date2);

    /**
     * Consulta para determinar si un juego esta disponible en un rango de fechas {@link Loan}
     *
     * @param gameId Id game
     * @param date1 fecha inicio
     * @param date2 fecha fin
     * @return boolean de {@link Loan}
     */
    @Query("SELECT COUNT(l) > 0 FROM Loan l WHERE l.game.id = :gameId AND " + "(:date1 BETWEEN l.date1 AND l.date2 OR :date2 BETWEEN l.date1 AND l.date2)")
    boolean existsByGameIdAndDateRange(@Param("gameId") Long gameId, @Param("date1") Date date1, @Param("date2") Date date2);

    //@Query("SELECT COUNT(l) > 0 FROM Loan l WHERE l.client.id = :clientId AND :date BETWEEN l.date1 AND l.date2")
    //boolean countByClientIdAndDateRange(@Param("clientId") Long clientId, @Param("date") Date date);

    /**
     * Consulta para recuperar un listado paginado de {@link Loan}
     *
     * @param pageable pageable
     * @return {@link Page} de {@link Loan}
     */
    Page<Loan> findAll(Pageable pageable);

}


