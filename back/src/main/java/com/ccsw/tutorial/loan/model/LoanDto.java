package com.ccsw.tutorial.loan.model;

import com.ccsw.tutorial.client.model.ClientDto;
import com.ccsw.tutorial.game.model.GameDto;

import java.util.Date;

/**
 * @author ccsw
 *
 */
public class LoanDto {

    private Long id;
    private GameDto game;
    private ClientDto client;
    private Date date1;
    private Date date2;

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id new value of {@link #getId}.
     */
    public void setId(Long id) {

        this.id = id;
    }

    /**
     * @return game
     */
    public GameDto getGame() {
        return game;
    }

    /**
     * @param game new value of {@link #getGame}.
     */
    public void setGame(GameDto game) {

        this.game = game;
    }

    /**
     * @return client
     */
    public ClientDto getClient() {

        return client;
    }

    /**
     * @param client new value of {@link #getClient}.
     */
    public void setClient(ClientDto client) {

        this.client = client;
    }

    /**
     * @return date1
     */
    public Date getDate1() {

        return date1;
    }

    /**
     * @param date1 new value of {@link #getDate1}.
     */
    public void setDate1(Date date1) {

        this.date1 = date1;
    }

    /**
     * @return date2
     */
    public Date getDate2() {

        return date2;
    }

    /**
     * @param date2 new value of {@link #getDate2}.
     */
    public void setDate2(Date date2) {

        this.date2 = date2;
    }
}
