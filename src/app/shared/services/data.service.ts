import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, merge, mergeMap } from 'rxjs';
import { ApprovalModel, Document } from '../interfaces/approval.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public newApprovalApi: boolean = true;

  constructor(private http: HttpClient) { }

  public getAllMeasurements(): Observable<ApprovalModel[]>{
    return this.http.get<ApprovalModel[]>('/assets/data/meansurements.json');
  }

  public getAllPurchaseOrder(): Observable<ApprovalModel[]>{
    return this.http.get<ApprovalModel[]>('/assets/data/purchaseOrder.json');
  }

  public getAllPurchaseRequest(): Observable<ApprovalModel[]>{
    return this.http.get<ApprovalModel[]>('/assets/data/purchaseRequest.json');
  }

  public getAllPurchaseOrderByFilter(filter: string[]): Observable<Document[]> {
     return this.http.get<ApprovalModel[]>('/assets/data/purchaseOrder.json').pipe(map((res, index) => {
      let data: any[] = [];
      res[index].documents.forEach((item, i) => {
        filter.filter((branch, ii) => {
          if(item.documentBranch === filter[ii]){
            data.push(item);
          }
        });
      });
      return data;
    }));
  }

}
