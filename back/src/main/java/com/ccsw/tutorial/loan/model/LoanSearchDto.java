package com.ccsw.tutorial.loan.model;

import com.ccsw.tutorial.common.PageableRequest;

public class LoanSearchDto {

    private PageableRequest pageable;
    private Long game;
    private Long client;

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
