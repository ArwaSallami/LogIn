import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Expedition} from '../../shared/Models/expedition';
import {DashboardService} from '../../shared/ApiServices/dashboard.service';

@Component({
  selector: 'app-new-reclamation',
  templateUrl: './new-reclamation.component.html',
  styleUrls: ['./new-reclamation.component.scss']
})
export class NewReclamationComponent implements OnInit {

  form;
  errorMsg;
  successMsg;
  isSublitting;
  expeditions: Expedition [] = [];
  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.form = fb.group({
      message: ['', [
        Validators.required
      ]],
      publicCode: [null, [ Validators.required]],
      type: [null, [ Validators.required]]

    });
  }
  get message() {
    return this.form.get('message');
  }
  get publicCode() {
    return this.form.get('publicCode');
  }
  get type() {
    return this.form.get('type');
  }

  ngOnInit() {
    this.dashboardService.getAllUserExpedition().subscribe(expeditions => {
      this.expeditions = expeditions;
      console.log(expeditions);
    } , error => {
      console.log(error);
    });
  }
  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      this.isSublitting = true;
      this.dashboardService.addReclamation(this.form.value).subscribe(response =>{
        this.successMsg = 'Votre reclamation a étet enregistré';
      }, error => {
        this.errorMsg = 'Une erreur technique est survenue, essayez plutard';
        this.isSublitting = false;
        console.log(error);
      });
    }
  }

}
