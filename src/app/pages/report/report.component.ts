import { Component, OnInit } from '@angular/core';
import { NewEncounter } from '../../models/new-encounter';
import { Router, RouterModule } from '@angular/router';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service';
import { AliensService } from '../../services/aliens.service';
import { Alien } from '../../models/alien';
import { ColonistService } from '../../services/colonist.service';
import { ReportsService } from '../../services/reports.service';
import { Job } from '../../models/job';
import { Colonists } from '../../models/colonists';
import { JobsService } from '../../services/jobs.service';
import { Report } from '../../models/report';
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
  providers: [AliensService, JobsService, ReportsService, ColonistService, RegisterComponent, EncountersService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  date: Date;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED: 'Select an alien...';

  constructor(private router: Router, private alienService: AliensService, private reportService: ReportsService, private colonistService: ColonistService, private encountersService: EncountersService, private formBuilder: FormBuilder) { }

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

  theDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };



  report(e) {
    e.preventDefault();
    if (this.reportForm.invalid) {
      alert('Please select an alien and describe your encounter...');
    } else {
      const date = this.theDate();
      const atype = this.reportForm.get('alien').value;
      const action = this.reportForm.get('action').value;
      const colonistId = localStorage.getItem('colonist_id');
      console.log(colonistId);
      const id = 2;

      const theEncounter = new Report(id, date, colonistId, atype, action);
      this.reportService.postData(theEncounter)
        .subscribe((newReport) => {
          console.log(newReport);
          this.router.navigate(['/encounters']);          
        });
    }
  }
};

