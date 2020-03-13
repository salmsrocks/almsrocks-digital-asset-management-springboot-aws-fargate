import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProgramComponent } from './program.component';
import { ProgramModule } from './program.module';

describe('TablesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ProgramModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
