import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { VilleService } from 'src/app/services/ville.service';
import { Client } from 'src/app/shared/client';
import { Contact } from 'src/app/shared/contact';
import { Ville } from 'src/app/shared/ville';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id : any;
  client: Client = {
    numClient: "",
    raisonSociale: "",
    dateCreation: undefined,
    i_f: "",
    i_c_e: "",
    adresse: "",
    numIdentTva: "",
    groupe: "",
    phyMorale: "physique",
    cin: "",
    regCommerce: "",
    nombreDepot: undefined,
    capaciteTR: "",
    nombreVehicule: undefined,
    capaciteStockage: "",
    typeSociete: undefined,
    ville: undefined,
    contact: undefined,
  };
  ville: Ville = {
    id: 0,
    libelleV: ""
  };
  vile: Ville[] = [];
  conta: Contact[] = [];
  contact: Contact = {
    id: 0,
    email: "",
    nomPrenom: "",
    telephone: ""
  };

  constructor(private villeService : VilleService,
              private contactService : ContactService,
              private route : ActivatedRoute,
              private clientService : ClientService,
              private router : Router
              
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.clientService.getByClient(this.id).subscribe(client =>{
      this.client = client
    })

  }

  onSubmit(){
    this.clientService.update(this.client).subscribe(client =>{
      console.log(client),
      this.router.navigate(['/listClient'])
    })

  }
  changeUsine(e: any) {
    console.log(e.target.value);
    this.client.typeSociete = e.target.value;
  }
  changeVille(e: any) {
    if(e){
      this.ville.libelleV = e
    }else {
      this.ville.libelleV = "";
    }
    this.villeService.getVille(e).subscribe(vile => {
      this.vile = vile;
      console.log(this.vile);
      console.log(this.client)
    })
  }
  getAutoCompleteValue(option : any) {
    return option ? option.nomPrenom : "";
  }
  getAutoCompleteValueville(option : any){
    return option ? option.libelleV : "";
  }
  getContacte(event: any){
    console.log(event)
    if(event){
      this.contact.nomPrenom = event
    }else {
      this.contact.nomPrenom = "";
    }
    this.contactService.getContact(event).subscribe(libele =>{
      this.conta = libele,
      console.log(this.conta),
      console.log(this.client)
    })
  }

}
