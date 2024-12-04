import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { PaiementService } from 'src/app/services/paiement.service';
import { Encaissement } from 'src/app/shared/encaissement';
import { Facture } from 'src/app/shared/facture';
import { Paiement } from 'src/app/shared/paiement';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {
  facture: Facture = {
    id: 0,
    numFacture: "",
    usineLivraison: "",
    numCamion: "",
    typeFacture: "facture",
    exonereTva: "Non",
    objetFacture: "",
    objetMarche: "",
    objetMois: "",
    dateFacture: undefined,
    client: undefined,
    modLivraison: ""
  };
  totalPaiement? : any;
  paiement : Paiement = {
    id : 0,
    num_facture : "",
    mon_facture : undefined,
    mon_regle : undefined,
    valider : false,
    encaissement : undefined
  }
  encaissement : Encaissement = {
    id : 0
  }
  afficherFacture: boolean= false;
  fcr: Facture[] = [];
  constructor(private factureService : FactureService,
              private paiementService : PaiementService,
              private route : ActivatedRoute,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.encaissement.id = this.route.snapshot.params.id;
    this.paiement.encaissement = this.encaissement;
  }
  onSubmit(){
    console.log(this.paiement)
    this.paiementService.editPaiement(this.paiement).subscribe(pm =>{
      console.log(pm),
      this.router.navigate(['/listePaiement/'+this.encaissement.id])
    })
  }
  changeNumFacture(e: string) {
    console.log(e)
    
    this.factureService.getAllFacture(e).subscribe(fcr => {
      this.afficherFacture= false,
      this.fcr = fcr,      
      console.log(this.fcr);
    }, error => {
      console.log(error);
    });
  }
  getAutoCompleteValuenumFacture(option : any) {
    return option ? option.numFacture : "";
  }
  getFacture(id : any , numFacture : any){
    this.afficherFacture = true
    console.log(id)
    this.paiementService.totalPaiement(id).subscribe(paiement =>{
      this.totalPaiement = paiement,
      this.paiement.mon_facture = this.totalPaiement
      this.paiement.num_facture = numFacture
      
    })
     
  }

}
