export interface Runner {
  SelectionId: string;
  RunnerName: string;
  StatusStr: string;
  JockeyName: string;
  StallDraw: string;
  Clothnumber: string;
  WearingURL: string;
  ProfitandLoss: number;
  Loss?: number;
  LastPriceTraded?: number;
  TotalMatched?: number;
  ExchangePrices: {
    AvailableToBack: { Price: number; Size: number }[];
    AvailableToLay: { Price: number; Size: number }[];
  };
}

export interface MarketBook {
OpenDate: any;
RunnersCount: number;
  MarketId: string;
  MarketBookName: string;
  marketsopened: number;
  MainSportsname: string;
  OrignalOpenDate: any; // ISO string
  SheetName: string;
  BettingAllowed: boolean;
  BettingAllowedOverAll: boolean;
  TotalMatched: number;
  FavoriteSelectionName: string;
  FavoriteID: string;
  FavoriteBack: number;
  FavoriteBackSize: number;
  FavoriteLay: number;
  FavoriteLaySize: number;
  MarketStatusstr: string;
  LineVMarkets?: any[];
  CricketMatchKey?: string;
  Runners: Runner[];
  GetMatchUpdatesFrom: string;
  EventID: string;
}