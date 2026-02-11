import { ChangeDetectorRef, Component,OnDestroy, OnInit } from '@angular/core';
import { MarketBook } from '../../interface/market';
import { MarketService } from '../../Services/market.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-market.component',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',
})
export class MarketComponent implements OnInit,OnDestroy {
  backgrod = '#ff0';      // use your ViewBag.backgrod
  color = '#000'; 
  market: MarketBook | null = null;
  selectedMarketId: string | null = null;
  private destroy$ = new Subject<void>();
  model: any = {};
  timerText: any;
  now = Date.now();

  constructor(private marketService: MarketService,private route: ActivatedRoute,private cdr: ChangeDetectorRef) {
     this.route.queryParams.subscribe(params => {
      this.model.selectedMarketId = params['id'];
      this.model.selectedMarketBook = params['marketBook'];
      this.model.selectedMarketStartTime = params['openDate'];
      this.model.selectedSport = params['sport'];
      this.model.eventName = params['eventName'];
    });
  }

ngOnInit(): void { 
   interval(1000) // ⏱ every 1 second
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.marketService.getMarkets(this.model))
      )
      .subscribe(res => {
        this.market = res;
        this.now = Date.now();
        this.timerText = this.getRemainingTime(this.model.selectedMarketStartTime);
        this.cdr.markForCheck();
      });
  }

  loadMarkets(): void {
    this.marketService.getMarkets(this.model).subscribe(res => {
      this.market = res;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getMarketImages(sport: string): string {
    switch (sport) {
      case 'Cricket': return '/ws4.png';
      case 'Horse Racing': return '/ws7.png';
      case 'Greyhound Racing': return '/ws4339.png';
      case 'Tennis': return '/ws2.png';
      case 'Soccer': return '/ws1.png';
      default: return '';
    }
  }

  showMarketRules(sport: string, marketBookName: string, runnersCount: number) {
    console.log('Show rules', sport, marketBookName, runnersCount);
    // Implement your rule popup logic
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    date.setHours(date.getHours() + 5); // add 5 hours
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
parseCustomDate(dateStr: string): Date {
  // "29-01-2026 04:00 PM"
  const [datePart, timePart, meridian] = dateStr.split(' ');

  const [day, month, year] = datePart.split('-').map(Number);
  let [hours, minutes] = timePart.split(':').map(Number);

  if (meridian === 'PM' && hours < 12) hours += 12;
  if (meridian === 'AM' && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes, 0);
}
  getRemainingTime(dateStr: string): string {
  if (!dateStr) return '';

  const eventDate = this.parseCustomDate(dateStr);
  const diffMs = eventDate.getTime() - this.now;

  if (diffMs <= 0) {
    return 'LIVE';
  }

  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

  selectMarket(marketId: string): void {
    this.selectedMarketId = marketId;
  }

  isSelected(marketId: string): boolean {
    return this.selectedMarketId === marketId;
  }

  addRunnersForMultipleBets(selectionId: string) {
    // same as AddRunnersformultiplebets
    console.log('Selected:', selectionId);
  }

  triggerChangeMethod(selectionId: string, marketId: string) {
    console.log(selectionId, marketId);
  }

  showBetSlip(
    selectionId: string,
    type: string,
    price: number,
    stake: number,
    marketId: string,
    marketName: string,
    size: number,
    index: number
  ) {
    console.log({ selectionId, type, price, stake, marketId, marketName, size, index });
  }
}
