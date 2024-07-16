import { Contact } from "./contact";
import { Encaissement } from "./encaissement";
import { FormeJuridique } from "./formeJuridique";
import { Ville } from "./ville";

export class Client{
      id? : number;
      numClient? : string;
      raisonSociale? : string;
      dateCreation? : Date;
      i_f? : string;
      i_c_e? : string;
      adresse? : string;
      numIdentTva? : string;
      groupe? : string;
      phyMorale? : string;
      cin? : string;
      regCommerce? : string;
      nombreDepot? : number | undefined;
      capaciteTR? : string;
      nombreVehicule? : number;
      capaciteStockage? : string;
      typeSociete? : FormeJuridique;
      ville? : Ville ;
      contact? : Contact;
}