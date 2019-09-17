import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appFamilyName]',
  providers: [{ provide: NG_VALIDATORS,
                  useClass: FamilyNameDirective, multi: true }]
})
export class FamilyNameDirective {

  constructor() { }

   validate(control: AbstractControl): { [key: string]: any } | null {
     return (control.value && control.value.length <= 100 && !/\d/.test(control.value)) ? null : { checkname: true };
   }
}
