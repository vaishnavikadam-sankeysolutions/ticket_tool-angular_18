import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apiUrl = 'http://localhost:3000'; // Base URL



  constructor(private http: HttpClient) { }

  login(obj: any) {
    const params = new HttpParams()
      .set('emailId', obj.emailId)
      .set('password', obj.password);

    return this.http.get(`${this.apiUrl}/users`, { params });
  }



  getDepartments() {
    return this.http.get(`${this.apiUrl}/departments`);
  }

  createDepartments(obj: any) {
    return this.http.post(`${this.apiUrl}/departments`, obj);
  }

  updateDepartments(obj: any) {
    return this.http.put(`${this.apiUrl}/UpdateDepartment`, obj);
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${this.apiUrl}/departments/${id}`);
  }
}
