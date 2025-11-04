import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AreaSimpleResponse } from "@app/shared/models/dto/areas/area-simple-response";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  public getAreas(): Observable<AreaSimpleResponse[]> {
    return this.http.get<AreaSimpleResponse[]>(`${this.apiUrl}/areas`);
  }
}
