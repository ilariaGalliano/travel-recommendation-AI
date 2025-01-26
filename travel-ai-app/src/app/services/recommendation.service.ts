import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = 'http://localhost:3000/generate-itinerary';

  constructor(private http: HttpClient) {}

  getRecommendations(city: string, days: number): Observable<any> {
    return this.http.post(this.apiUrl, { city, days });
  }
}
