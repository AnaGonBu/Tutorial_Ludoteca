package com.ccsw.tutorial.client;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.client.model.ClientDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Override
    public Client get(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Client> findAll() {
        return (List<Client>) this.clientRepository.findAll();
    }

    @Override //alta
    public void salve(ClientDto dto) {
        Client client;
        Client clientName = this.clientRepository.findByName(dto.getName());
        if (clientName == null) {
            client = new Client();
            client.setName(dto.getName());
            this.clientRepository.save(client);
        } else {
            throw new IllegalArgumentException("Client name already exists: " + dto.getName());
        }

    }

    @Override //modificar
    public void save2(Long id, ClientDto dto) {
        Client client;
        Client clientName = this.clientRepository.findByName(dto.getName());

        if (clientName == null && id != null) {
            client = this.clientRepository.findById(id).orElse(null);
            client.setName(dto.getName());
            this.clientRepository.save(client);
        } else {
            throw new IllegalArgumentException("Client name already exists: " + dto.getName());
        }

    }
    
    @Override
    public void delete(Long id) throws Exception {

        if (this.clientRepository.findById(id).orElse(null) == null) {
            throw new Exception("Not exists");
        }

        this.clientRepository.deleteById(id);

    }
}
