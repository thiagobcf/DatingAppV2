import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { PaginatedResult } from '../_models/pagination';
import type { Message } from '../_models/message';
import { setPaginationHeaders, setPagnatedResponse } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);

  getMessages(pageNumber: number, pageSize: number, container: string) 
  {
    let params = setPaginationHeaders(pageNumber, pageSize);
    params = params.append('container', container);
    return this.http.get<Message[]>(this.baseUrl + 'messages', {observe: 'response', params})
      .subscribe({
        next: response =>  setPagnatedResponse(response, this.paginatedResult)     
    })
  }
}
