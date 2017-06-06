import {
  Component,
  OnInit,
  Input,
  Output
}
  from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  Http,
  Headers,
  RequestOptions,
  Response
}
  from '@angular/http';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Unacceptable value': value } : null;
  }
};

const tooOld = (age: number): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value > age ? { 'Too old for Mars': age } : null;
  }
};

import { Router, RouterModule } from '@angular/router';

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
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';
import { Colonists } from '../../models/colonists';
import { ColonistService } from '../../services/colonist.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService],

animations: [
  trigger('flyInOut', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ])
]

})
export class RegisterComponent implements OnInit {
  jobs: Job[] = [];
  colonists: Colonists[] = [];
  registerForm: FormGroup;
  NO_JOB_SELECTED: '';
  constructor(private router: Router, private jobService: JobsService, private colonistService: ColonistService, private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.jobService.getData()
      .subscribe((data) => {
        this.jobs = data.jobs;
      });
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.minLength(2)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)]),
    });
  };

  postColonist() {
    const colonistName = this.registerForm.get('name').value;
    const colonistJob = this.registerForm.get('job_id').value;
    const colonistAge = this.registerForm.get('age').value;

    const colonist = new Colonists(colonistName, colonistAge, colonistJob);

    this.colonistService.postData(colonist)
      .subscribe((newColonist) => {
        console.log(newColonist);
        localStorage.setItem("colonist_id", (newColonist.colonist.id).toString());  
        
      });
  };

  register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      alert('Please enter your name, age, and occupation, Colonist!');
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      this.router.navigate(['/encounters']);          
      
    }
  }

}
