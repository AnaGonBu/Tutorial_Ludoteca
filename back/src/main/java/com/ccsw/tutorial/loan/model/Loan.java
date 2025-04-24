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

    public long getId() {
        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public Game getGame() {

        return game;
    }

    public void setGame(Game game) {

        this.game = game;
    }

    public Client getClient() {

        return client;
    }

    public void setClient(Client client) {

        this.client = client;
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
