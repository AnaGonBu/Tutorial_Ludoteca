package com.ccsw.tutorial.client;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.client.model.ClientDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Client", description = "API of Category")
@RequestMapping(value = "/client")
@RestController
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    ClientService clientService;

    @Autowired
    ModelMapper mapper;

    /**
     * Método para recuperar todos los clientes
     *
     * @return {@link List} de {@link ClientDto}
     */
    @Operation(summary = "Find", description = "Method that return a list of Categories")
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<ClientDto> findAll() {
        List<Client> categories = this.clientService.findAll();

        return categories.stream().map(e -> mapper.map(e, ClientDto.class)).collect(Collectors.toList());
    }

    /**
     * Método para crear un alta
     *
     * @param dto datos de la entidad
     */
    @Operation(summary = "Alta", description = "Method that saves a new client")
    @RequestMapping(path = "", method = RequestMethod.POST)
    public void save(@RequestBody ClientDto dto) {
        this.clientService.save(dto);
    }

    /**
     * Método para actualizar un cliente
     *
     * @param id PK de la entidad
     * @param dto datos de la entidad
     */
    @Operation(summary = "Modificacion", description = "Method that modify a  client")
    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public void save2(@PathVariable Long id, @RequestBody ClientDto dto) {
        this.clientService.save(dto);
    }

    /**
     * Método para eliminar un cliente
     *
     * @param id PK de la entidad
     */
    @Operation(summary = "Eliminacion", description = "Method that delete a  client")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) throws Exception {
        this.clientService.delete(id);
    }

}
