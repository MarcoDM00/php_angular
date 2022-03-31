import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'; //per usare un observable invece delle callback
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = 'http://localhost/api_cars';

  constructor(private http:HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  store(car: Car) {
    return this.http.post(`${this.baseUrl}/store`, { data: car }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  update(car: Car) {
    return this.http.put(`${this.baseUrl}/update`, { data: car });
  }

  delete(id: any) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/delete`, { params: params });
  }
}
