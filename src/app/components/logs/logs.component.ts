import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: {
    id: string,
    text: string,
    date: any
  }[];

  constructor() { }

  ngOnInit() {
    this.logs = [
      { id: '1', text: 'Generated Component', date: new Date('01/25/2018 12:54:23') },
      { id: '2', text: 'Added Bootstrap', date: new Date('02/27/2018 09:33:23') },
      { id: '3', text: 'Added Logs Component', date: new Date('12/20/2018 08:54:23') }
    ];
  }

}
