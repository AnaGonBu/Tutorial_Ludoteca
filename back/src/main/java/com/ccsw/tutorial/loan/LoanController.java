package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author ccsw
 *
 */
@Tag(name = "Loan", description = "API of Loan")
@RequestMapping(value = "/loan")
@RestController
@CrossOrigin(origins = "*")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private ModelMapper mapper;

    /**
     * Recupera el listado de autores {@link Loan}
     *
     * @return {@link List} de {@link LoanDto}
     */
    @Operation(summary = "Find", description = "Method that return a list of Authors")
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<LoanDto> findAll() {

        List<Loan> loans = this.loanService.getAll();

        return loans.stream().map(e -> mapper.map(e, LoanDto.class)).collect(Collectors.toList());
    }

    /**
     * Método para recuperar un listado paginado de {@link Loan}
     *
     * @param dto dto de búsqueda
     * @return {@link Page} de {@link LoanDto}
     */
    @Operation(summary = "Find Page", description = "Method that return a page of Loans")
    @RequestMapping(path = "", method = RequestMethod.POST)

    public Page<LoanDto> findPage(@RequestBody LoanSearchDto dto) {

        Page<Loan> page = this.loanService.findPage(dto);

        return new PageImpl<>(page.getContent().stream().map(e -> mapper.map(e, LoanDto.class)).collect(Collectors.toList()), page.getPageable(), page.getTotalElements());
    }

    /**
     * Método para recuperar una lista de {@link Loan}
     *
     * @param title título del juego
     * @param  name del cliente
     * @return {@link List} de {@link LoanDto}
     */
    @Operation(summary = "Find", description = "Method that return a filtered list of Loans")
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<LoanDto> find(@RequestParam(value = "game", required = false) String title, @RequestParam(value = "client", required = false) String name) {

        List<Loan> games = loanService.find(title, name);

        return games.stream().map(e -> mapper.map(e, LoanDto.class)).collect(Collectors.toList());
    }

    /**
     * Método para crear o actualizar un {@link Loan}
     *
     * @param dto LoanDto
     */
    @Operation(summary = "Save or Update", description = "Method that saves or updates a Game")
    @RequestMapping(path = { "", "/{id}" }, method = RequestMethod.PUT)
    public void save(@PathVariable(name = "id", required = false) Long id, @RequestBody LoanDto dto) {

        loanService.save(id, dto);

    }

    /**
     * Método para borrar una categoria
     *
     * @param id PK de la entidad
     */
   /* @Operation(summary = "Delete", description = "Method that deletes a Category")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {

        this.loans.remove(id);
    }*/
}