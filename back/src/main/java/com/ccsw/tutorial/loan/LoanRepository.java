package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.loan.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LoanRepository extends CrudRepository<Loan, Long> {

    /**
     * Método para recuperar un listado paginado de {@link Loan}
     *
     * @param pageable pageable
     * @return {@link Page} de {@link Loan}
     */
    Page<Loan> findAll(Pageable pageable);

    List<Loan> findByGame(Long idGame);

    List<Loan> findByClient(Long idClient);

    /**
     * Método para recuperar un listado paginado filtrado o no de {@link Loan}
     *
     * @param pageable pageable
     * @param game de game
     * @param client de client
     * @return {@link Page} de {@link Loan}

     @Query("SELECT l FROM Loan l WHERE (:game IS NULL OR l.game.title LIKE %:game%) AND (:client IS NULL OR l.client.name LIKE %:client%)")
     Page<Loan> findByGameAndClient(@Param("game") String game, @Param("client") String client, Pageable pageable);
     */
}


