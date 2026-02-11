import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportHighlightsComponent } from './sport-highlights.component';

describe('SportHighlightsComponent', () => {
  let component: SportHighlightsComponent;
  let fixture: ComponentFixture<SportHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportHighlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportHighlightsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
