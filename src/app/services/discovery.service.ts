import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscoveryFormDto } from '../models/discovery-form-dto';
import { DiscoveryTypeDropdownDto } from '../models/discovery-type-dropdown-dto';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  private apiDiscoveryUrl = 'https://localhost:7221/api/Discovery';
  private apiMissionUrl = 'https://localhost:7221/api/Mission'; // add line

  constructor(private http: HttpClient) { }

  getAll(missionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiMissionUrl}/${missionId}/discovery`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiDiscoveryUrl}/${id}`);
  }

  create(discovery: DiscoveryFormDto): Observable<DiscoveryFormDto> {
    return this.http.post<DiscoveryFormDto>(`${this.apiDiscoveryUrl}`, discovery);
  }

  createDiscoveryForMission(missionId: number, discovery: DiscoveryFormDto): Observable<DiscoveryFormDto> {
    return this.http.post<DiscoveryFormDto>(`${this.apiMissionUrl}/${missionId}/discovery`, discovery);
  }

  update(discovery: DiscoveryFormDto): Observable<DiscoveryFormDto> {
    return this.http.put<DiscoveryFormDto>(`${this.apiDiscoveryUrl}`, discovery);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiDiscoveryUrl}/${id}`);
  }

  getDiscoveryTypeDropdownList(): Observable<any> {
    return this.http.get<any>(`${this.apiDiscoveryUrl}/types`);
  }
}
