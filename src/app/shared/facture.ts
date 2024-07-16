import { Client } from "./client";
import { ModeLivraison } from "./modelivraison";

export  class Facture{
    id?: number;
    numFacture?: string;
    usineLivraison?: string;
    numCamion?: string;
    typeFacture?: string;
    exonereTva?: string;
    objetFacture?: string;
    objetMarche?: string;
    objetMois? : string;
    dateFacture?: Date;
    valider? : boolean;
    client? : Client;
    modLivraison? : string;
  }