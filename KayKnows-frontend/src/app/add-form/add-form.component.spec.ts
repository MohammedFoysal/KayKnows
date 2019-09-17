import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddFormComponent} from './add-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

describe('AddFormComponent', () => {
  const validName = 'steve';
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
      ],
      declarations: [AddFormComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when the form is empty', () => {
    expect(component.family_name.invalid).toBeTruthy();
  });

  it('should display the family input on selection', () => {
    component.selected = 'Job Family';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#familyInput');
    expect(input).not.toBeNull();
  });

  it('should update the value in the control', () => {
    component.selected = 'Job Family';
    fixture.detectChanges();
    component.family_name.setValue(validName);
    const input = fixture.nativeElement.querySelector('#familyInput');
    expect(input.value).toBe(validName);
  });

  it('should be valid when there is a valid name', () => {
    component.family_name.setValue(validName);
    expect(component.family_name.valid).toBeTruthy();
  });

  it('should not be valid when there is a name that is to long', () => {
    component.family_name.setValue(validName.repeat(30));
    expect(component.family_name.invalid).toBeTruthy();
  });
});
