import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { SwitchboardService } from '../switchboard.service';
import { Family } from '../family';
import { CapabilityLead } from '../capability-lead';

@Component({
    selector: '[app-tree]',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

    static highlighted: number = -1;
    dataService: DataService;
    switchboard: SwitchboardService;
    thisFamily: Family;
    thisCapabilityLead: CapabilityLead;
    @Input() data;

    constructor(dataService: DataService, switchboard: SwitchboardService) {
      this.switchboard = switchboard;
      this.dataService = dataService;

    }

    onSelect(newFamily: Family) : void{
      this.thisFamily = newFamily;
      this.switchboard.switchFamily(this.thisFamily);
      console.log('Hello There family');
    }

    ngOnInit() {
    }

    getColour(data: any): string {
        return "3px solid" + data.band_colour;
    }

    getBackgroundColour(data: any): string {
        return data.band_colour;
    }

    getHighlighted() {
        return TreeComponent.highlighted;
    }

    setHighlighted(band_id: number) {
        TreeComponent.highlighted = band_id;
    }
}
