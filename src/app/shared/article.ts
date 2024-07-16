import { Facture } from "./facture";
import { Famille } from "./famille";
import { TypeArticle } from "./type-article";

export class Article{
    id? : number;
    codeArticle? : string;
    libarticle? : string;
    prixUnitaire? : number;
    tva? : number;
    unite? : string;
    usineFabrication? : string;
    articleVentable? : string;
    fabrique? : string;
    familleProduit? : Famille;
    classeProduit? : TypeArticle;
    dateArticle? : Date;
}