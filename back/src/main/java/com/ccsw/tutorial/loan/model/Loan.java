package com.ccsw.tutorial.loan.model;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.game.model.Game;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "loan")
public class Loan implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "date1")
    private Date date1;

    @Column(name = "date2")
    private Date date2;

    /**
     * @return id
     */
    public long getId() {
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
    public Game getGame() {

        return game;
    }

    /**
     * @param game new value of {@link #getGame}.
     */
    public void setGame(Game game) {

        this.game = game;
    }

    /**
     * @return client
     */
    public Client getClient() {

        return client;
    }

    /**
     * @param client new value of {@link #getClient}.
     */
    public void setClient(Client client) {

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
