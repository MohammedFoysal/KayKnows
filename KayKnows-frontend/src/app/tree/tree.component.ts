import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { SwitchboardService } from '../switchboard.service';
// import { Family } from '../family';
// import { CapabilityLead } from '../capability-lead';
// import { Capability } from '../capability';
// import { User } from '../user';

@Component({
    selector: '[app-tree]',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

    static highlighted: number = -1;
    dataService: DataService;
    switchboard: SwitchboardService;
    // family: Family;
    // capability_lead: CapabilityLead;
    // capabilityLeadJson : string;
    // capability: Capability;
    // user: User;

    @Input() data;

    constructor(dataService: DataService, switchboard: SwitchboardService) {
      this.switchboard = switchboard;
      this.dataService = dataService;
    }

    onSelect(dataObject: any, e:Event) : void{
        e.stopPropagation();
        e.preventDefault();
      if(dataObject.type === "family"){
        this.switchboard.switchFamily(dataObject);
      }
      if(dataObject.type === "capability"){
        this.switchboard.switchCapability(dataObject);
        this.switchboard.switchCapabilityLead(dataObject.capability_id);
      }
      if(dataObject.type === "role"){
        this.switchboard.switchRole(dataObject.role_id);
      }
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
