import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsinComponent } from './rightsin.component';

describe('AdminPageComponent', () => {
    let component: RightsinComponent;
    let fixture: ComponentFixture<RightsinComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [RightsinComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RightsinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
