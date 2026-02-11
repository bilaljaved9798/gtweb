import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { MarketBook } from '../interface/market';


@Injectable({ providedIn: 'root' })
export class MarketService {
    private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getMarkets(model:any): Observable<MarketBook> {

return this.http.get<any>(
  `${this.baseUrl}MarketApi/MarketBookData` +
  `?ID=${model.selectedMarketId}` +
  `&sheetname=${model.selectedMarketBook}` +
  `&MainSportsCategory=${model.selectedSport}`
);

}
}
