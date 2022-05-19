import { Injectable} from '@angular/core';
declare let $: any;
@Injectable({
    providedIn: 'root'
})
export class AnonymousUserCookies {
    countryInfo: any;
    siteInfoCountry: any;
    siteInfoLanguage: any;
    cookieData = {
        path: '/'
    };
    
    constructor() {}
    
    setCountryInfoCookie(cntry: any, exp: any) {
        var data = $.extend({}, this.cookieData);
        if (exp) {
            data = $.extend(data, {expires: exp});
        }
		$.cookie('country_info', cntry, data);
        this.countryInfo = cntry;
    }

    setSiteInfoCookie(country: any, language: any, exp: any) {

        var data = $.extend({}, this.cookieData);

        if (exp) {
            data = $.extend(data, {expires: exp});
        }

        //Self Service wants the raw value.
        $.cookie.raw = true;
        $.cookie('site_info', country + '|' + language, data);
        $.cookie.raw = false;

        this.siteInfoCountry = country;
        this.siteInfoLanguage = language;
    }
}