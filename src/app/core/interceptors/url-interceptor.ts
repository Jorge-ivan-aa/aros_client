import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loggingService = inject(LoggingService);

    // Skip if the URL is already absolute (contains http:// or https://)
    if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
      loggingService.http(`Skipping URL transformation for absolute URL: ${req.url}`);
      return next.handle(req);
    }

    // Transform relative URLs to absolute URLs using environment API URL
    const absoluteUrl = this.transformUrl(req.url);
    loggingService.http(`Transforming URL: ${req.url} -> ${absoluteUrl}`);

    const newReq = req.clone({
      url: absoluteUrl
    });

    return next.handle(newReq);
  }

  private transformUrl(url: string): string {
    // If the URL already starts with the API URL, return as is
    if (url.startsWith(environment.apiUrl)) {
      return url;
    }

    // If the URL starts with /, remove it to avoid double slashes
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url;

    // Combine the API URL with the clean URL
    return `${environment.apiUrl}/${cleanUrl}`;
  }
}
