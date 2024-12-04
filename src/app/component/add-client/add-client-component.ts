import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { VilleService } from 'src/app/services/ville.service';
import { Client } from 'src/app/shared/client';
import { Contact } from 'src/app/shared/contact';
import { Ville } from 'src/app/shared/ville';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  raison: string = '';
  raisonSocialError: string = '';
  contactById: any;
  client: Client = {
    id: 0,
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
  constructor(private villeService: VilleService,
    private contactService: ContactService,
    private clientService: ClientService,
    private router: Router) { }
  vile: Ville[] = [];
  ville: Ville = {
    id: 0,
    libelleV: ""
  };
  conta: Contact[] = [];
  contact: Contact = {
    id: 0,
    email: "",
    nomPrenom: "",
    telephone: ""
  };
  searchTerm: string = '';
  selectedOption: any;
  filteredOptions: Ville[] = this.vile;

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.raisonSocialError) {
      console.log('Form has errors.');
      return;
    }
    console.log(this.client);
    this.clientService.save(this.client).subscribe(client => {
      console.log(client),
      this.router.navigate(['/listClient'])

    });
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
  
  search(form: string) {
    console.log(form);
    if (!this.searchTerm) {
      this.filteredOptions = this.vile;
    } else {
      this.filteredOptions = this.vile.filter(ville => ville.libelleV?.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

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
  ngAfterViewInit() {
    
    const raisonSocialeInput = document.getElementById('raisonSociale');
    if (raisonSocialeInput){
      fromEvent(raisonSocialeInput, 'input').pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.clientService.checkIfRaisonSocialExists(this.client))
      ).subscribe(
        exists => {
          this.raisonSocialError = exists ? 'Raison Social already exists.' : '';
        },
        err => {
          console.error(err);
        }
      );



      
    }
    
  }

}
