import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private _LogSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });
  public selectedLog = this._LogSource.asObservable();

  private _stateSource = new BehaviorSubject<Boolean>(true);
  public stateClear = this._stateSource.asObservable();

  constructor() {
    this.logs = [
      //   { id: '1', text: 'Generated Component', date: new Date('01/25/2018 12:54:23') },
      //   { id: '2', text: 'Added Bootstrap', date: new Date('02/27/2018 09:33:23') },
      //   { id: '3', text: 'Added Logs Component', date: new Date('12/20/2018 08:54:23') }
    ];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
    this._LogSource.next(log);
    console.log(log);
  }

  addLog(newLog: Log) {
    this.logs.unshift(newLog)

    // add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(updatedLog: Log) {
    this.logs.forEach((currLog, index) => {
      if (updatedLog.id === currLog.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(updatedLog);

    // update local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((currLog, index) => {
      if (log.id === currLog.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this._stateSource.next(true);
  }
}
