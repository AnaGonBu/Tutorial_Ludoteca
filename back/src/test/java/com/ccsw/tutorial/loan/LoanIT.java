package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.model.ClientDto;
import com.ccsw.tutorial.common.PageableRequest;
import com.ccsw.tutorial.game.model.GameDto;
import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)

public class LoanIT {

    public static final String LOCALHOST = "http://localhost:";

    public static final String SERVICE_PATH = "/loan";

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    ParameterizedTypeReference<List<Map<String, Object>>> listMapType = new ParameterizedTypeReference<>() {
    };
    ParameterizedTypeReference<Map<String, Object>> mapType = new ParameterizedTypeReference<>() {
    };

    private static final Long EXISTING_CLIENT_ID = 1L;
    private static final Long EXISTING_GAME_ID = 1L;
    private static final Long NON_EXISTENT_LOAN_ID = 999L;

    @Test
    public void findAllShouldReturnAllLoans() {
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, listMapType);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().size() >= 1); // depende de tus datos iniciales
    }

    @Test
    public void findPageableShouldReturnPagedResults() {

        LoanSearchDto searchDto = new LoanSearchDto();
        PageableRequest pageable = new PageableRequest();
        pageable.setPageNumber(0);
        pageable.setPageSize(5);
        searchDto.setPageable(pageable);

        HttpEntity<LoanSearchDto> request = new HttpEntity<>(searchDto);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.POST, request, mapType);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((List<?>) response.getBody().get("content")).size() <= 5);

    }

    @Test
    public void saveShouldFailWhenGameIsAlreadyLoaned() throws Exception {
        LoanDto dto = new LoanDto();
        ClientDto client = new ClientDto();
        client.setId(EXISTING_CLIENT_ID);
        dto.setClient(client);
        GameDto game = new GameDto();
        game.setId(EXISTING_GAME_ID);
        dto.setGame(game);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        dto.setDate1(sdf.parse("2025-05-01"));
        dto.setDate2(sdf.parse("2025-05-10"));

        HttpEntity<LoanDto> request = new HttpEntity<>(dto);
        ResponseEntity<Void> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/alta", HttpMethod.POST, request, Void.class);

        // Verificar que la respuesta sea 500 Internal Server Error
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Comprobar que no se haya añadido el préstamo
        ResponseEntity<List<Map<String, Object>>> loansResponse = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, listMapType);
        assertEquals(HttpStatus.OK, loansResponse.getStatusCode());
        assertNotNull(loansResponse.getBody());

        // Verificar que el nuevo préstamo no está en la lista
        boolean exists = loansResponse.getBody().stream().anyMatch(
                loan -> EXISTING_CLIENT_ID.equals(((Map<String, Object>) loan.get("client")).get("id")) && EXISTING_GAME_ID.equals(((Map<String, Object>) loan.get("game")).get("id")) && "2025-05-01".equals(loan.get("date1"))
                        && "2025-05-10".equals(loan.get("date2")));
        assertFalse(exists);
    }

    @Test
    public void deleteShouldRemoveLoanIfExists() throws Exception {
        // 1. Crear un préstamo primero
        LoanDto dto = new LoanDto();
        ClientDto client = new ClientDto();
        client.setId(EXISTING_CLIENT_ID);
        dto.setClient(client);
        GameDto game = new GameDto();
        game.setId(EXISTING_GAME_ID);
        dto.setGame(game);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        dto.setDate1(sdf.parse("2025-05-02"));
        dto.setDate2(sdf.parse("2025-05-09"));

        HttpEntity<LoanDto> request = new HttpEntity<>(dto);
        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/alta", HttpMethod.POST, request, Void.class);
        // 2. Obtener el ID del préstamo recién creado
        ResponseEntity<List<Map<String, Object>>> loans = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, listMapType);
        Long loanId = ((Number) loans.getBody().get(0).get("id")).longValue();
        // 3. Borrarlo
        ResponseEntity<Void> deleteResponse = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + loanId, HttpMethod.DELETE, null, Void.class);
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    @Test
    public void deleteWithInvalidIdShouldReturnError() {
        ResponseEntity<String> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + NON_EXISTENT_LOAN_ID, HttpMethod.DELETE, null, String.class);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

}

