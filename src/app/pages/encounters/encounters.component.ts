import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss']
})
export class EncountersComponent implements OnInit {

    interval; //Declared for use below
    message = "Hello";
    listOfMessages = [
      "Hi",
      "Hey",
      "Sup",
      "Word",
      "Guten tag",
      "Kiddah",
      "Sod off m8",
      "Morning!",
      "Konichi wa",
    ];

  constructor() { 
    
  }
// interval list populate demo below
  ngOnInit() {
    this.interval = setInterval(() => {    
    let index = Math.floor(Math.random() * this.listOfMessages.length);
    this.message = this.listOfMessages[index];
    this.listOfMessages.push(this.message);
    }, 500);
  }

stopTheMadness(e) {
  e.preventDefault();
  clearInterval(this.interval);
}
}
