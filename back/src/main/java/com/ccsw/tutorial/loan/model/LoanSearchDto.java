package com.ccsw.tutorial.loan.model;

import com.ccsw.tutorial.common.PageableRequest;

import java.util.Date;

public class LoanSearchDto {

    private PageableRequest pageable;
    private Long game;
    private Long client;
    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getClient() {
        return client;
    }

    public void setClient(Long client) {
        this.client = client;
    }

    public Long getGame() {
        return game;
    }

    public void setGame(Long game) {
        this.game = game;
    }

    public PageableRequest getPageable() {
        return pageable;
    }

    public void setPageable(PageableRequest pageable) {
        this.pageable = pageable;
    }
}
