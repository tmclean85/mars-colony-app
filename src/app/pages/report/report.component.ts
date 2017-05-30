import { Component, OnInit } from '@angular/core';
import { AliensService } from '../../services/aliens.service';
import { Alien } from '../../models/alien';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];

  constructor(private alienService: AliensService) { }

  ngOnInit() {
    this.alienService.getData()
    .subscribe((data) => {
      this.aliens = data.aliens;
      console.log (this.aliens);
    });
  }

}
