import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanetFormDto } from '../models/planet-form-dto';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private apiPlanetUrl = 'https://localhost:7221/api/Planet';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPlanetUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPlanetUrl}/${id}`);
  }

  create(planet: PlanetFormDto): Observable<PlanetFormDto> {
    return this.http.post<PlanetFormDto>(this.apiPlanetUrl, planet);
  }

  update(planet: PlanetFormDto): Observable<PlanetFormDto> {
    return this.http.put<PlanetFormDto>(`${this.apiPlanetUrl}`, planet);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPlanetUrl}/${id}`);
  }
}
