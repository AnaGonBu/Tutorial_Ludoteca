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

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.client.id = :clientId AND " + "(:date1 BETWEEN l.date1 AND l.date2 OR :date2 BETWEEN l.date1 AND l.date2 OR " + "l.date1 BETWEEN :date1 AND :date2 OR l.date2 BETWEEN :date1 AND :date2)")
    long countByClientIdAndDateRange(@Param("clientId") Long clientId, @Param("date1") Date date1, @Param("date2") Date date2);

    @Query("SELECT COUNT(l) > 0 FROM Loan l WHERE l.game.id = :gameId AND " + "(:date1 BETWEEN l.date1 AND l.date2 OR :date2 BETWEEN l.date1 AND l.date2)")
    boolean existsByGameIdAndDateRange(@Param("gameId") Long gameId, @Param("date1") Date date1, @Param("date2") Date date2);

    //@Query("SELECT COUNT(l) > 0 FROM Loan l WHERE l.client.id = :clientId AND " + "(:date1 BETWEEN l.date1 AND l.date2 OR :date2 BETWEEN l.date1 AND l.date2)")
    //boolean existsByClientIdAndDateRange(@Param("clientId") Long clientId, @Param("date1") Date date1, @Param("date2") Date date2);
    @Query("SELECT COUNT(l) > 0 FROM Loan l WHERE l.client.id = :clientId AND " + "(:date1 BETWEEN l.date1 AND l.date2 OR :date2 BETWEEN l.date1 AND l.date2 OR " + "l.date1 BETWEEN :date1 AND :date2 OR l.date2 BETWEEN :date1 AND :date2)")
    boolean existsByClientIdAndDateRange(@Param("clientId") Long clientId, @Param("date1") Date date1, @Param("date2") Date date2);

    /**
     * Método para recuperar un listado paginado de {@link Loan}
     *
     * @param pageable pageable
     * @return {@link Page} de {@link Loan}
     */
    Page<Loan> findAll(Pageable pageable);

}


