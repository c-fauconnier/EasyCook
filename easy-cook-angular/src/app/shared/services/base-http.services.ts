import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseService<T> {
    baseApiURL: string = 'http://localhost:4200';
    abstract endPoint: string;

    constructor(private http: HttpClient) {}

    create(dto: any): Observable<T> {
        return this.http.post<any>(`${this.baseApiURL}/${this.endPoint}`, dto);
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseApiURL}/${this.endPoint}`);
    }

    get(id: string): Observable<T> {
        return this.http.get<T>(`${this.baseApiURL}/${this.endPoint}/${id}`);
    }

    update(id: string, dto: any): Observable<unknown> {
        return this.http.put<unknown>(`${this.baseApiURL}/${this.endPoint}/${id}`, dto);
    }

    delete(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.baseApiURL}/${this.endPoint}/${id}`);
    }
}
