import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveNotePage } from './save-note.page';

describe('SaveNotePage', () => {
  let component: SaveNotePage;
  let fixture: ComponentFixture<SaveNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
