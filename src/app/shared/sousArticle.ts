import { Article } from "./article";
import { Facture } from "./facture";

export class SousArticle{
    id? : number;
    quantite : number | undefined;
    prixUnitaire : number | undefined;
    tva? : number;
    facture? : Facture;
    article? : Article;
}