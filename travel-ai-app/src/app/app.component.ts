import { Component } from '@angular/core';
import { RecommendationService } from './services/recommendation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  city: string = '';
  days: number = 1;
  recommendations: string = '';

  constructor(private recommendationsService: RecommendationService) {}

  fetchRecommendations() {
    if (this.city && this.days > 0) {
      this.recommendationsService.getRecommendations(this.city, this.days).subscribe(
        (response) => {
          this.recommendations = response.itinerary;
        },
        (error) => {
          console.error('Error fetching recommendations:', error);
        }
      );
    }
  }
}
