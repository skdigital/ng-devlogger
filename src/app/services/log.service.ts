import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private LogSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });

  public selectedLog = this.LogSource.asObservable();

  constructor() {
    this.logs = [
      { id: '1', text: 'Generated Component', date: new Date('01/25/2018 12:54:23') },
      { id: '2', text: 'Added Bootstrap', date: new Date('02/27/2018 09:33:23') },
      { id: '3', text: 'Added Logs Component', date: new Date('12/20/2018 08:54:23') }
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.LogSource.next(log);
    console.log(log);
  }

  addLog(newLog: Log) {
    this.logs.unshift(newLog)
  }

  updateLog(updatedLog: Log) {
    this.logs.forEach((currentLog, index) => {
      if (updatedLog.id === currentLog.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(updatedLog);
  }
}
