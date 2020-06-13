import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from 'src/app/components/models/header-data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    routeUrl:''
  }); 

  constructor() { }

  get headerData(): HeaderData
  {
    return this._headerData.value;
  }

  set headerData(headerData: HeaderData)
  {
    this._headerData.next(headerData);
  }

}
