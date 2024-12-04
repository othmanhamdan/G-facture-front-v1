import { Encaissement } from "./encaissement";

export class Paiement{
    id? : number;
    num_facture? : string;
    mon_facture? : number;
    mon_regle? : number;
    valider? : boolean;
    encaissement? : Encaissement;
}