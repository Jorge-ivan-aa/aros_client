import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Table {
  id: number;
  name: string;
  status: 'AVAILABLE' | 'OCCUPIED';
  currentOrderId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private http = inject(HttpClient);

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>('tables/status');
  }

  getTableByName(name: string): Observable<Table | undefined> {
    return this.getTables().pipe(
      map(tables => tables.find(t => t.name === name))
    );
  }

  getOccupiedTables(): Observable<Table[]> {
    return this.getTables().pipe(
      map(tables => tables.filter(t => t.status === 'OCCUPIED'))
    );
  }

  getAvailableTables(): Observable<Table[]> {
    return this.getTables().pipe(
      map(tables => tables.filter(t => t.status === 'AVAILABLE'))
    );
  }

  getOccupiedTablesCount(): Observable<number> {
    return this.getOccupiedTables().pipe(
      map(tables => tables.length)
    );
  }

  getAvailableTablesCount(): Observable<number> {
    return this.getAvailableTables().pipe(
      map(tables => tables.length)
    );
  }


}
