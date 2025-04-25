import { Client } from "../../client/model/Client";
import { Game } from "../../game/model/Game";

export class Loan {
    id: number;
    game: string;
    client: string;
    date1: Date;
    date2: Date;
}