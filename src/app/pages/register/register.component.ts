import {
  Component,
  OnInit,
  Input,
  Output
}
  from '@angular/core';
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
  providers: [JobsService, ColonistService]
})
export class RegisterComponent implements OnInit {
  jobs: Job[] = [];
  colonists: Colonists[] = [];
  registerForm: FormGroup;
  NO_JOB_SELECTED: 'no job';
  constructor(private jobService: JobsService, private colonistService: ColonistService, private formBuilder: FormBuilder) { }



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
      });
  };

  register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      console.log('You done fucked up');
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
    }
  }

}
