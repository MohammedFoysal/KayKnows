import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: '[app-tree]',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

    static highlighted: number = -1;

    @Input() data;

    constructor() { 
    }

    ngOnInit() {
        
    }

    getColour(data: any): string {
        return "3px solid #" + data.band_colour;
    }

    getBackgroundColour(data: any): string {
        return "#" + data.band_colour;
    }

    getHighlighted() {
        return TreeComponent.highlighted;
    }

    setHighlighted(band_id: number) {
        TreeComponent.highlighted = band_id;
    }
}
