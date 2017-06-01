import { Component, OnInit, Input, Output } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';
import { Colonists } from '../../models/colonists'; 
import { ColonistService } from '../../services/colonist.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonists: Colonists[] = [];
  constructor(private jobService: JobsService, private colonistService: ColonistService) { }

ngOnInit() {
  this.jobService.getData()
  .subscribe((data) => {
    this.jobs = data.jobs;
//      console.log(this.jobs)
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
