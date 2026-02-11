import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Dashboardservices } from '../../Services/dashboard.service';

@Component({
  selector: 'app-dashboard.component',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit  {
  allMarkets: any[] = [];
  eventTypes: string[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    public _dashboardServices: Dashboardservices, private cdr: ChangeDetectorRef
  ) {
  }



ngOnInit(): void {
    this.functionDashboard(); 
  }

  functionDashboard() {
    this._dashboardServices.getDefultDashboards()
      .subscribe(res => {
        this.allMarkets = res.page.allMarkets;
        this.eventTypes = [...new Set(this.allMarkets.map(x => x.mainSportsname))];
        this.cdr.markForCheck();
      });
    //this.cdr.detectChanges();
  }

  get eventTypes1(): string[] {
    return [...new Set(this.allMarkets.map(x => x.mainSportsname))];
  }

  getCount(category: string): number {
    return this.allMarkets.filter(x => x.mainSportsname === category).length;
  }

  normalizeCategory(item: string): string {
    if (item === 'Horse Racing') return 'Horse';
    if (item === 'Greyhound Racing') return 'Greyhound';
    return item;
  }

  isRacing(item: string): boolean {
    return item === 'Horse Racing' || item === 'Greyhound Racing';
  }

  getCaretColor(match: any, isCricket: boolean): string {
    if (isCricket && match.MarketBookName === 'Winner') return 'green';
    switch (match.MarketStatus) {
      case 'In Play': return 'green';
      case 'Closed':
      case 'suspended': return '#bb2d3b';
      default: return 'black';
    }
  }

  getMatchStatusColor(match: any): string {
    switch (match.MarketStatus) {
      case 'In Play': return 'green';
      case 'Closed':
      case 'suspended': return '#bb2d3b';
      default: return 'black';
    }
  }

  setActiveCategory(category: string) {
    console.log('Active Category:', category);
  }

 openMarket(marketId: string,marketBook:string,openDate:string ,sport: string,eventName: string) {
  this.router.navigate(['/market'], {
    queryParams: { id: marketId, marketBook: marketBook, openDate: openDate, sport: sport, eventName: eventName }
  });
}

}

