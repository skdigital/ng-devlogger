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

  isNew: boolean = true;

  constructor(private _logService: LogService) {
    this._logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submission works!');
    // Check if new log
    if (this.isNew) {
      // Create a new log
      const newLog = {
        id: this.getenerateId(),
        text: this.text,
        date: new Date()
      }
      this._logService.addLog(newLog);
    } else {
      // create log to be updated
      const updateLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // update log
      this._logService.updateLog(updateLog);
    }
  }

  

  // Generates a new UUID
  getenerateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
