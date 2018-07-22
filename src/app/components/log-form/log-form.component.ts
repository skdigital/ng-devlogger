import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { LogService } from "../../services/log.service";

// Models
import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  text: string;
  date: Date;

  constructor(private _logService: LogService) {
    this._logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    })
  }

  ngOnInit() {
  }

}
