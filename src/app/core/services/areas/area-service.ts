import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AreaSimpleResponse } from "@app/shared/models/dto/areas/area-simple-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private http: HttpClient) {
    // 
  }
  
  public getAreas(): Observable<AreaSimpleResponse[]> {
    return this.http.get<AreaSimpleResponse[]>('http://localhost:8080/api/areas');
  }
}