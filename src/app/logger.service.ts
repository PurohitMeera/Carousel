import { Injectable } from '@angular/core';
import { LogLevel } from './enums/logger.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  level: LogLevel = LogLevel.All;
 

  debug(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
}

info(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
}

warn(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
}

error(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
}

fatal(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
}

log(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
}

writeToLog(msg:any , level:LogLevel , params:any[]){

  if (this.shouldLog(level)) {
    let value:any="";
    // value += "Type:" +LogLevel[level];
    value +=  msg;
    console.log(value);
  }
}

private shouldLog(level: LogLevel): boolean {
  let ret: boolean = false;
  if (
    (level >= this.level && level !== LogLevel.Off) ||
    this.level === LogLevel.All
  ) {
    ret = true;
  }
  return ret;
}


}
