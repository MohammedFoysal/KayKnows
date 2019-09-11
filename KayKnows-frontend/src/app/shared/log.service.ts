import { Injectable } from '@angular/core';


//Keeps track of what kind of logging to perform
export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable()
export class LogEntry {
  // Public Properties
  entryDate: Date = new Date();
  message: string = "";
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate: boolean = true;
      
  //Gathers the values from the properties of this class and returns them in one long string 
  //that can be used to output to the console window
  buildLogString(): string {
    let ret: string = "";
      
    if (this.logWithDate) {
      ret = new Date() + " - ";
    }
    ret += "Type: " + LogLevel[this.level];
    ret += " - Message: " + this.message;
    if (this.extraInfo.length) {
      ret += " - Extra Info: "
        + this.formatParams(this.extraInfo);
    }
      
    return ret;
  }
      
  private formatParams(params: any[]): string {
    let ret: string = params.join(",");
      
    // Is there at least one object in the array?
    if (params.some(p => typeof p == "object")) {
      ret = "";
      // Build comma-delimited string
      for (let item of params) {
        ret += JSON.stringify(item) + ",";
      }
    }
      
    return ret;
  }
}
export class LogService {
  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  //Determines if logging should occur based on the level property set in the LogService class
  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.level &&
         level !== LogLevel.Off) ||
         this.level === LogLevel.All) {
      ret = true;
    }
    //Tells the writeToLog() method to log the message
    return ret;
  }

private writeToLog(msg: string,
                   level: LogLevel,
                   params: any[]) {
  if (this.shouldLog(level)) {
    let entry: LogEntry = new LogEntry();
    entry.message = msg;
    entry.level = level;
    entry.extraInfo = params;
    entry.logWithDate = this.logWithDate;
    console.log(entry.buildLogString());
  }
}

  //Adds new methods
  //Calls writeToLog passing in the message, the appropriate enumeration value and an optional parameter array
  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug,
                    optionalParams);
  }
        
  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info,
                    optionalParams);
  }
        
  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn,
                    optionalParams);
  }
        
  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error,
                    optionalParams);
  }
        
  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal,
                    optionalParams);
  }
        
  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All,
                    optionalParams);
  }
}
