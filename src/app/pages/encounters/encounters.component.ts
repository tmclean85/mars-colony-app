import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service'

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService]
})
export class EncountersComponent implements OnInit {  

    // interval; //Declared for use below
    // message = "Hello";
    // listOfMessages = [
    //   "Hi",
    //   "Brruuuhhhh",
    //   "Word",
    //   "Guten tag",
    //   "Kiddah",
    //   "Sod off m8",
    //   "Morning!",
    //   "Konichi wa",
    // ];
  encounters: Encounter[] = [];


  constructor(private encounterService: EncountersService) { 
    
  }
// interval list populate demo below
  ngOnInit() {
    this.encounterService.getData()
    .subscribe((data) => {
      this.encounters = data.encounters;
    });   
    }; 

    

    // this.interval = setInterval(() => {    
    // let index = Math.floor(Math.random() * this.listOfMessages.length);
    // this.message = this.listOfMessages[index];
    // this.listOfMessages.push(this.message);
    // }, 500);
  }

// stopTheMadness(e) {
//   e.preventDefault();
//   clearInterval(this.interval);
// }

