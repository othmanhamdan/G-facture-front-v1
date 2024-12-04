import { Client } from "./client";

export class Encaissement{
    id? : number;
    numEncssm? : string;
    dateEncssm? : Date;
    dateEcheance? : Date;
    natureEncssm? :  string;
    montant? : number;
    observation? : string;
    client? : Client; 

    
}