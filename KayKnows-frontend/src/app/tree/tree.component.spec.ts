import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let role: any[];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;

    // This is totally a role, trust me
    role = makeDummyRole();
    component.data = role;

    component.setHighlighted(-1);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have nothing highlighted', () => {
    expect(component.getHighlighted()).toBe(-1);
  });

  it('should not be highlighted with a band', () => {
    component.setHighlighted(role[0].band_id + 1);

    fixture.detectChanges();

    let node = fixture.nativeElement.querySelector('a');
    expect(node.style.backgroundColor).toEqual('white');
  });

  it('should be highlighted with a band', () => {
    component.setHighlighted(role[0].band_id);

    fixture.detectChanges();

    let node = fixture.nativeElement.querySelector('a');
    expect(node.style.border).toContain('rgb(18, 175, 77)');
  });
});

function makeDummyRole(): any[] {
  let role = [{
    band_id: 7,
    band_colour: '#12AF4D', // 18, 175, 77
    band_name: 'Xavlegbmaofffassssitimiwoamndutroabcwapwaelippohfffx', // Apparently this is a band, don't look at what it stands for or their music probably
    role_id: 12,
    role_name: 'string',
    label: 'string',
    capability_id: 3,
    family_id: 2,
    type: 'role',
    opened: true
  }];

  return role;
}
