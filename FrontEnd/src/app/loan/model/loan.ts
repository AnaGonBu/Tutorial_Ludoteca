import { Client } from "../../client/model/Client";
import { Game } from "../../game/model/Game";

export class Loan {
    id: number;
    name: Game["title"];
    client: Client["name"];
    date1: Date;
    date2: Date;
}