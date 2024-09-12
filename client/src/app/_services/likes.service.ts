import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);

  toogleLike(targetId: number) {
    return this.http.post(`${this.baseUrl}likes/${targetId}`, {})
  }

  getLike(predicate: string) {
    return this.http.get(`${this.baseUrl}likes?predicate=${predicate}`);
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/ids`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }
}
