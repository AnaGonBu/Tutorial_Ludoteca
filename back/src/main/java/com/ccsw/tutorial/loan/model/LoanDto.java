package com.ccsw.tutorial.loan.model;

import com.ccsw.tutorial.client.model.ClientDto;
import com.ccsw.tutorial.game.model.GameDto;

import java.util.Date;

public class LoanDto {

    private Long id;
    private GameDto gameName;
    private ClientDto clientName;
    private Date date1;
    private Date date2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GameDto getGameName() {
        return gameName;
    }

    public void setGameName(GameDto gameName) {
        this.gameName = gameName;
    }

    public ClientDto getClientName() {
        return clientName;
    }

    public void setClientName(ClientDto clientName) {
        this.clientName = clientName;
    }

    public Date getDate1() {
        return date1;
    }

    public void setDate1(Date date1) {
        this.date1 = date1;
    }

    public Date getDate2() {
        return date2;
    }

    public void setDate2(Date date2) {
        this.date2 = date2;
    }
}
