import { Component, 
         OnInit, 
         Input, 
         Output } 
         from '@angular/core';         
import { Http,
         Headers, 
         RequestOptions, 
         Response } 
         from '@angular/http';
import { FormGroup,
         FormControl, 
         FormBuilder, 
         Validators, 
         ValidatorFn, 
         AbstractControl,
         ReactiveFormsModule }
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
//      console.log(this.jobs)
  });
  this.registerForm = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    age: new FormControl('',  [Validators.required]),
    job_id: new FormControl(this.NO_JOB_SELECTED, []),
  });
};

postColonist(colonists: Colonists) {
//   const colonistName = ;
//   const colonistJob = ;
//   const colonistAge = ;

//   const colonist = new Colonists(this.colonistName, this.colonistAge, this.colonistJob);
  const colonist = new Colonists("Trevor", "31", 4);

  this.colonistService.postData(colonist)
                 .subscribe((newColonist) => {                  
                 console.log(colonist);
                 });
  };  


}
