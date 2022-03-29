import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'; //per usare un observable invece delle callback
import { Record } from './record';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrl = 'http://localhost/api_tris';

  constructor(private http:HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/get`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  store(rc: Record) {
    return this.http.post(`${this.baseUrl}/put`, {data: rc}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  delete(id: any) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/delete`, { params: params });
  }
}
