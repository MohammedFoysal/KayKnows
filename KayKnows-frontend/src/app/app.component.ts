import { Component } from '@angular/core';
import { DataService } from './data.service';
import { triggerAsyncId } from 'async_hooks';
import { Capabilities } from 'protractor';
import { getLocaleExtraDayPeriodRules } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';
  dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
    // this.data = this.getFamiliesNested();
    // this.flat = this.dataService.treeDataNested;
    // this.filter();
  }



  // filter() {
  //   var newFlat = [];

  //   for (let i = 0; i < this.flat.length; i++) {
  //     if (this.family_ids.includes(this.flat[i].family_id)) {
  //       newFlat.push(this.flat[i]);
  //     }
  //   }

  //   let nestedData = this.getFamiliesNested(newFlat);

  //   for (var familyIndex in nestedData) {
  //     let family = nestedData[familyIndex];

  //     for (var capabilityIndex in family.children) {
  //       let capability = nestedData[familyIndex].children[capabilityIndex];

  //       if (!this.existsInFilteredCapabilities(capability, this.capability_ids)) {
  //         nestedData[familyIndex].children.splice(capabilityIndex, 1)
  //       }
  //     }
  //   }

  //   this.data = nestedData;
  // }


}
