import { Injectable } from '@angular/core';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logLevel: LogLevel = LogLevel.DEBUG;
  private readonly isProduction: boolean = false;

  constructor() {
    // In production, default to WARN level to reduce noise
    this.isProduction = window.location.hostname !== 'localhost' &&
                       window.location.hostname !== '127.0.0.1';

    if (this.isProduction) {
      this.logLevel = LogLevel.WARN;
    }
  }

  /**
   * Set the minimum log level to display
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Debug logs - for development debugging
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  /**
   * Info logs - for general information
   */
  info(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[INFO] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  /**
   * Warning logs - for non-critical issues
   */
  warn(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  /**
   * Error logs - for critical errors
   */
  error(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  /**
   * Log authentication related events
   */
  auth(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[AUTH] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  /**
   * Log routing related events
   */
  routing(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[ROUTING] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  /**
   * Log HTTP request/response events
   */
  http(message: string, ...args: unknown[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[HTTP] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }
}
