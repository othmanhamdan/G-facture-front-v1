import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaiementService } from 'src/app/services/paiement.service';
import { Paiement } from 'src/app/shared/paiement';

@Component({
  selector: 'app-edit-paiement',
  templateUrl: './edit-paiement.component.html',
  styleUrls: ['./edit-paiement.component.css']
})
export class EditPaiementComponent implements OnInit {
  currentPage = 0
  constructor(private dialogRef : MatDialogRef<EditPaiementComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any,
               private paiementService : PaiementService,
               private router : Router
  ) { }
  paiement : Paiement = {
    id : 0,
    num_facture : "",
    mon_facture : undefined,
    mon_regle : undefined,
    valider : false,
    encaissement : undefined
  }
  ngOnInit(): void {
    this.paiement = this.data;

  }
  onSubmit(){
    this.router.navigate(["/vide"])
    this.paiementService.editPaiement(this.paiement).subscribe(pm =>{
      console.log(pm),
      this.router.navigate(["/listePaiement/"+this.paiement.encaissement?.id])
    })
   
  }
  closed(){
    //this.router.navigate(["/listePaiement/"+this.paiement.id])
    this.dialogRef.close();
  }
 

}
