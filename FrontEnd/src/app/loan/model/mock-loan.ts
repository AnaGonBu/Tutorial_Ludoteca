import { CLIENT_DATA } from "../../client/model/mock-clients";
import { GAME_DATA } from "../../game/model/mock-games";
import { LoanPage } from "./loanPage";

export const LOAN_DATA: LoanPage = {
    content: [
        { id: 1, name: GAME_DATA[0].title, client: CLIENT_DATA[0].name,date1:new Date('20/1/2020'),date2:new Date ('30/1/2020')},
        { id: 2, name: GAME_DATA[1].title, client: CLIENT_DATA[1].name,date1:new Date('19/1/2020'),date2:new Date ('29/1/2020')},
        { id: 3, name: GAME_DATA[2].title, client: CLIENT_DATA[2].name,date1:new Date('18/1/2020'),date2:new Date ('28/1/2020')},
        { id: 4, name: GAME_DATA[3].title, client: CLIENT_DATA[3].name,date1:new Date('17/1/2020'),date2:new Date ('27/1/2020') },
        { id: 5, name: GAME_DATA[4].title, client: CLIENT_DATA[4].name,date1:new Date('16/1/2020'),date2:new Date ('26/1/2020') },
        { id: 6, name: GAME_DATA[5].title, client: CLIENT_DATA[5].name,date1:new Date('19/1/2020'),date2:new Date ('25/1/2020') },
        { id: 7, name: GAME_DATA[6].title, client: CLIENT_DATA[6].name,date1:new Date('19/1/2020'),date2:new Date ('24/1/2020') },
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 7,
};
