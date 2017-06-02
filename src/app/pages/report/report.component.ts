import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service';
import { AliensService } from '../../services/aliens.service';
import { Alien } from '../../models/alien';
import { ColonistService } from '../../services/colonist.service';
import { ReportsService } from '../../services/reports.service';
import { Job } from '../../models/job';
import { Colonists } from '../../models/colonists';
import { Report } from '../../models/report';
import { JobsService } from '../../services/jobs.service';
import { RegisterComponent } from '../register/register.component';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule
}
  from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Unacceptable value': value } : null;
  }
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, JobsService, ReportsService, ColonistService, RegisterComponent]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED: 'no alien';

  constructor(private alienService: AliensService, private reportService: ReportsService, private colonistService: ColonistService, registry: RegisterComponent, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.alienService.getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
      });

    this.reportForm = new FormGroup({
      alien: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  };

  postReport() {
    const reportAlien = this.reportForm.get('alien').value;
    const reportAction = this.reportForm.get('action').value;
  };

  theDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  report(e) {
    e.preventDefault();
    if (this.reportForm.invalid) {
      console.log('You fucked up son');
    } else {
      const alien = this.reportForm.get('alien').value;
      const action = this.reportForm.get('action').value;
      const date = this.theDate();
      console.log(alien, action, date);
    }
  };
}
