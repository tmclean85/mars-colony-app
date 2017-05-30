import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getData()
    .subscribe((data) => {
      this.jobs = data.jobs;
//      console.log(this.jobs)
    });
  };

}
