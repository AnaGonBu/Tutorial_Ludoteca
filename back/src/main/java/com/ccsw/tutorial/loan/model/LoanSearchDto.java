package com.ccsw.tutorial.loan.model;

import com.ccsw.tutorial.common.PageableRequest;

public class LoanSearchDto {

    private PageableRequest pageable;
    private String game;
    private String client;

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public PageableRequest getPageable() {
        return pageable;
    }

    public void setPageable(PageableRequest pageable) {
        this.pageable = pageable;
    }
}
