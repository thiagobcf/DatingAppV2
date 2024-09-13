import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { Member } from '../_models/member';
import type { PaginatedResult } from '../_models/pagination';
import { setPaginationHeaders, setPagnatedResponse } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginationResult = signal<PaginatedResult<Member[]> | null>(null);

  toogleLike(targetId: number) {
    return this.http.post(`${this.baseUrl}likes/${targetId}`, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);
    
    return this.http.get<Member[]>(`${this.baseUrl}likes`, 
      { observe: 'response', params }).subscribe({
        next: response => {
          setPagnatedResponse(response, this.paginationResult);
        }
      });
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/ids`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }
}
