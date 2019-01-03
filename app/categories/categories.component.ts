import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Categories",
    moduleId: module.id,
    templateUrl: "./categories.component.html",
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    currentGeoLocation: any;

    constructor(private _activatedRoute: ActivatedRoute) {
        try {
            this.currentGeoLocation = JSON.parse(this._activatedRoute.snapshot.queryParams['geolocation']);
        } catch (e) {
            console.error(e);
        }
    }

    ngOnInit(): void {
    }
}
