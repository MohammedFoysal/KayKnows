import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close({confirmed: false});
  }

  confirm() {
    this.dialogRef.close({confirmed: true});
  }

}
