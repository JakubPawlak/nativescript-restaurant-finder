import * as geoLocation from "nativescript-geolocation";
import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentGeoLocation: any;

    constructor(private _page: Page, private _routerExtensions: RouterExtensions, ) {
        this._page.actionBarHidden = true;
    }

    ngOnInit(): void {
        this.enableLocationServices();
    }

    onCurrentLocationTap() {
        const navigationExtras = {
            queryParams: {
                "geolocation": JSON.stringify(this.currentGeoLocation),
            },
            transition: {
                name: "slide",
                duration: 250,
                curve: "easeInOut"
            }
        };

        this._routerExtensions.navigate(['/categories'], navigationExtras);
    }

    private enableLocationServices(): void {
        geoLocation.isEnabled().then(enabled => {
            if (!enabled) {
                geoLocation.enableLocationRequest().then(() => this.showLocation());
            } else {
                this.showLocation();
            }
        });
    }

    private showLocation(): void {
        geoLocation.watchLocation(location => {
            this.currentGeoLocation = location;
        }, error => {
            alert(error);
        }, {
            desiredAccuracy: 3,
            updateDistance: 10,
            minimumUpdateTime: 1000 * 1
        });
    }
}
