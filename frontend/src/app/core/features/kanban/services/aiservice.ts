import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/ai`;
  
  generateText(prompt: string): Observable<string> {
    return this.http.post<{ text: string }>(`${this.apiUrl}/generate`, { prompt })
      .pipe(
        map(response => response.text)
      );
  }
}
