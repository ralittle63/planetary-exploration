import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MissionFormDto } from '../models/mission-form-dto';
import { PlanetDropdownDto } from '../models/planet-dropdown-dto';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiMissionUrl = 'https://localhost:7221/api/Mission';
  private apiPlanetUrl = 'https://localhost:7221/api/Planet';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiMissionUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiMissionUrl}/${id}`);
  }

  create(mission: MissionFormDto): Observable<MissionFormDto> {
    return this.http.post<MissionFormDto>(this.apiMissionUrl, mission);
  }

  update(mission: MissionFormDto): Observable<MissionFormDto> {
    return this.http.put<MissionFormDto>(`${this.apiMissionUrl}`, mission);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiMissionUrl}/${id}`);
  }

  getPlanetDropdownList(): Observable<any> {
    return this.http.get<any>(`${this.apiPlanetUrl}/dropdown`);
  }
}
