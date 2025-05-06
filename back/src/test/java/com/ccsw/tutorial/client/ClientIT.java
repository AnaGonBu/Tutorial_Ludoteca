package com.ccsw.tutorial.client;

import com.ccsw.tutorial.client.model.ClientDto;
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

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class ClientIT {

    public static final String LOCALHOST = "http://localhost:";
    public static final String SERVICE_PATH = "/client";

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    ParameterizedTypeReference<List<ClientDto>> responseType = new ParameterizedTypeReference<List<ClientDto>>() {
    };
    public static final String NEW_CLIENT_NAME = "Nuevo Cliente";
    public static final Long EXISTING_CLIENT_ID = 1L;
    public static final Long DELETE_CLIENT_ID = 8L;
    public static final Long CLIENT_WITH_LOAN_ID = 2L;
    public static final Long NON_EXISTENT_ID = 99L;

    @Test
    public void findAllShouldReturnAllClients() {
        ResponseEntity<List<ClientDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, responseType);
        assertNotNull(response);
        assertEquals(8, response.getBody().size()); // Asegúrate que la base tiene 8 clientes inicialmente
    }

    @Test
    public void saveWithoutIdShouldCreateNewClient() {
        ClientDto dto = new ClientDto();
        dto.setName(NEW_CLIENT_NAME);

        HttpEntity<ClientDto> request = new HttpEntity<>(dto);
        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.POST, request, Void.class);

        ResponseEntity<List<ClientDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, responseType);

        assertNotNull(response);
        assertEquals(9, response.getBody().size());

        boolean exists = response.getBody().stream().anyMatch(client -> NEW_CLIENT_NAME.equals(client.getName()));
        assertTrue(exists);

    }

    @Test
    public void modifyWithExistIdShouldUpdateClient() {
        String updatedName = "Nombre Modificado";
        ClientDto dto = new ClientDto();
        dto.setName(updatedName);

        HttpEntity<ClientDto> request = new HttpEntity<>(dto);
        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + EXISTING_CLIENT_ID, HttpMethod.PUT, request, Void.class);

        ResponseEntity<List<ClientDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, responseType);

        assertNotNull(response);
        ClientDto updatedClient = response.getBody().stream().filter(client -> client.getId().equals(EXISTING_CLIENT_ID)).findFirst().orElse(null);

        assertNotNull(updatedClient);
        assertEquals(updatedName, updatedClient.getName());

    }

    @Test
    public void deleteWithExistsIdAndNoLoanShouldDeleteClient() {
        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + DELETE_CLIENT_ID, HttpMethod.DELETE, null, Void.class);

        ResponseEntity<List<ClientDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, responseType);

        assertNotNull(response);
        assertEquals(7, response.getBody().size());

    }

    @Test
    public void deleteClientWithLoanShouldReturnError() {
        ResponseEntity<String> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + CLIENT_WITH_LOAN_ID, HttpMethod.DELETE, null, String.class);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void deleteWithNotExistsIdShouldReturnError() {
        ResponseEntity<String> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + NON_EXISTENT_ID, HttpMethod.DELETE, null, String.class);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

    }
}
