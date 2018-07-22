import { Component, OnInit } from '@angular/core';

// Services
import { LogService } from "../../services/log.service";

// Models
import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];

  selectedLog: Log;
  loaded: Boolean = false;

  constructor(private _logService: LogService) { }

  ngOnInit() {
    this._logService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedLog = { id: '', text: '', date: '' };
      }
    })

    this._logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }

  onSelect(log: Log) {
    this._logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if (confirm('(Delete) Are you sure?')) {
      this._logService.deleteLog(log);
    }
  }
}
