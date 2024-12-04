import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EncaisseService } from 'src/app/services/encaisse.service';
import { Encaissement } from 'src/app/shared/encaissement';


@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css']
})
export class EncaissementComponent implements OnInit {
  encaissemet : Encaissement = {
    id : 0,
    numEncssm : "",
    dateEncssm : undefined,
    dateEcheance : undefined,
    natureEncssm :  "",
    montant : undefined,
    observation : "",
    client : undefined
  }

  constructor(private encaisseService : EncaisseService,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private dialogRef : MatDialogRef<EncaissementComponent>
  ) { }

  ngOnInit(): void {
    this.encaissemet.client = this.data
  }
  onSubmit(){
    this.encaisseService.save(this.encaissemet).subscribe(encss =>{
      console.log(encss)
    })
  }
  closed(){
    this.dialogRef.close();
  }
 

}
