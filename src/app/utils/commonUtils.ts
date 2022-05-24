import { Injectable, OnInit } from '@angular/core';
import { TeV2AemService } from '../te-v2-aem.service';
@Injectable({
    providedIn: 'root'
})

export class CommonUtils implements OnInit {
    constructor(private _teService: TeV2AemService) { }
    ngOnInit(): void {

    }

    isSafari(){
        return !!window.navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    }

    getCountry(array: any, id: any) {
        let obj = array.filter(function (val: any) {
            var isoCode = val.id ? val.id : (val.code ? val.code : val.iso);
            return isoCode === id;
        });
        return obj[0];
    }

    getSitePath() {
        let settings = this._teService.getTeV2Array().ns('settings');
        return settings.isEditMode? settings.sitePath : ('/'+settings.country+"-"+settings.lang);
    }
}