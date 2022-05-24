import { Injectable, OnInit } from '@angular/core';
import { TeV2AemService } from '../te-v2-aem.service';
import { LoggerService } from '../logger.service';
import { UrlHelpersService } from './url-helpers.service';
import { SettingsHelperService } from './setting-helper.service';
import { AnonymousUserCookies } from './anonymous-user-cookies.service';
declare let $: any;
@Injectable({
    providedIn: 'root'
})

export class CommerceUtils implements OnInit {
    COUNTRY_ISO_CODE_MAPPING: any = {};
    STORE = {
        TEUSA: 'TEUSA',
        TESOG: 'TESOG'
    };
    typeOfProducts: any;
    constructor(private _teService: TeV2AemService, private _logger: LoggerService, 
        private _urlHelper: UrlHelpersService, private _settingsHelperService: SettingsHelperService,
        private _anonymousUserCookies:AnonymousUserCookies) { }

    ngOnInit(): void {

    }

    isSamplesStore() {
        return (this._teService.getTeV2Array().store && this._teService.getTeV2Array().store.storeType === 'S');
    }

    isCommerceEnabled() {
        return this.getStoreId('') && !this.isSamplesStore() ? true : false;
    }

    isCurrentSiteTESOG() {
        return this.getStoreId('') === this.STORE.TESOG;
    }

    getStoreId(countryISOCode: any) {
        return this._teService.getTeV2Array().store ? (countryISOCode ? this._teService.getTeV2Array().store.getStore(countryISOCode).storeId : this._teService.getTeV2Array().store.storeId) : "";
    }

    getCountry() {
        let siteCountry = this._teService.getTeV2Array().ns('settings').country;
        return siteCountry ? (siteCountry === 'global' ? $.cookie("country_info") : siteCountry) : "";
    }

    getTwoCharacterCountryCode(iso3Code: any) {
        return this.COUNTRY_ISO_CODE_MAPPING[iso3Code ? iso3Code.toUpperCase() : this.getCountry().toUpperCase()];
    }

    getThreeCharacterCountryCode(value: any) {
        var arr = this.COUNTRY_ISO_CODE_MAPPING;
        for (var prop in arr) {
            if (arr.hasOwnProperty(prop)) {
                if (arr[prop] === value)
                    return prop.toLowerCase();
            } 
        }
        return;
    }

    isShippingCountryTESOG(param: any) {
        return this.getStoreId(param.toLowerCase()) === this.STORE.TESOG;
    }

    isShippingCountryTEUSA(param: any) {
        return this.getStoreId(param.toLowerCase()) === this.STORE.TEUSA;
    }

    getSitePathByCountry(id: any) {
        switch (id) {
            case 'usa':
                return 'usa-en';
            case 'deu':
                return 'deu-de';
            case 'chn':
                return 'chn-zh';
            case 'jpn':
                return 'jpn-ja';
            default:
                return 'global-en';
        }
    }

    getSitePathByCountryForAuthor(id: any) {
        switch (id) {
            case 'usa':
                return '/content/te-com/usa/en';
            case 'deu':
                return '/content/te-com/deu/de';
            case 'chn':
                return '/content/te-com/chn/zh';
            case 'jpn':
                return '/content/te-com/jpn/ja';
            default:
                return '/content/te-com/global/en';
        }
    }

    getCartCookieCount() {
        var cartCookie = this.getCartCookie();
        return (cartCookie && cartCookie.length > 0) ? cartCookie.split("||")[1] : 0;
    }

    getCartCookie() {
        var cartCookieVal = $.cookie('cart-' + this.getStoreId(''));
        return cartCookieVal ? decodeURIComponent(cartCookieVal) : "";
    }

    getExternalHost(lang: any) {
        var language = lang || this._teService.getTeV2Array().settings.lang;
        return (language !== "zh") ? this._teService.getTeV2Array().urls.httpsExternalhost : this._teService.getTeV2Array().urls.httpsExternalhost + '.cn';
    }

    extractProductsFromEntries(myArray: any, type: any) {
        var typeOfProducts: any = { DEU: '0494_STORE', LADD: 'LADDUS', DK: 'DIGIKEY' };
        var obj: any[] = [];
        myArray.forEach((item: { fulfilledBy: any; }) => {
            if (item.fulfilledBy === typeOfProducts[type]) {
                obj.push(item);
            }
        });
        return obj;
    }

    setCountryAndSiteInfoCookieOnLoad() {
        let baseurl = window.location.href;
        let countryCookie = $.cookie('country_info');
        let params = this._urlHelper.extractQSParamsFromUrl(baseurl);
        let siteCountry = this._urlHelper.extractCountryFromURL(baseurl);
        let sitelang = this._urlHelper.extractLanguageFromURL(baseurl);
        // comming from China iso param is added to URL which needs to be set.
        let currentCntry = baseurl.indexOf("iso=") !== -1 ? params['iso'] : siteCountry;
        this._logger.info('Setting Country Info Cookie initiated =', siteCountry, 'countryCookie =', countryCookie, "params=", params, "Current Counry=", currentCntry);
        //Setting site country as country info cookie as it should be as per site.
        if (currentCntry && currentCntry !== 'global' && currentCntry !== countryCookie) {
            this._anonymousUserCookies.setCountryInfoCookie(currentCntry, 3650);
            this._anonymousUserCookies.setSiteInfoCookie(currentCntry, sitelang, 3650);
        }
    }

    getMiniCartDetails() {
        this._logger.info("get mini cart call Initiated");
        this.setCountryAndSiteInfoCookieOnLoad();
        let lastDeffer = $.Deferred();
        let session = window.sessionStorage.getItem("mini-cart-details");
        let siteEnabled = this._teService.getTeV2Array().store && this._teService.getTeV2Array().store.storeType;
        let currentCtry = this.getCountry();
        /*Since commerceUtils.js is a dependency in user.js file, commerceUtils.js file initiates before user.js file.
        So here, to check whether the user is signedIn or not, we need to check the cookie as we can't use user.js file*/
        let TECuso4 = $.cookie('TECuso4');
        let isUserSignedin = TECuso4 && TECuso4.toLowerCase() === 'signed in';
        let checkBeforeCall = isUserSignedin && (session === null || session !== currentCtry) && siteEnabled !== "";
        this._logger.info('getMiniCart check, session=', session, "currentCtry=", currentCtry, 'checkBeforeCall=', checkBeforeCall);
        if (checkBeforeCall) {
            let url = this._settingsHelperService.envHost("/bin/te/commerce/shop/getMiniCart");
            $.ajax({
                method: 'GET',
                url: url,
                cache: false,
                success: function (data: any) {
                    this.logger.info("get mini cart details success " + JSON.stringify(data));
                    if (data && data.guid) {
                        let cookieVal = data.guid + '||' + data.totalItems;
                        $(".counter").addClass('showCart');
                        $("#samples-cart-count, .hamburger-samples-cart-count").text(data.totalItems);
                        this.setCartCookie(cookieVal);
                        window.sessionStorage.setItem('mini-cart-details', currentCtry);
                    }
                    lastDeffer.resolve(data);
                },
                error: function (data: any) {
                    this._logger.info("get mini cart details failed", data);
                    lastDeffer.resolve(data);
                }
            });
        }
        return lastDeffer.promise();
    }

    setCartCookie(cookieVal: any, expiresInDays: any, countryId: any) {
        $.cookie('cart-' + this.getStoreId(countryId), cookieVal, {
            path: "/",
            expires: expiresInDays ? expiresInDays : 365 * 10 //If expiresInDays is not mentioned then by default 10 years
        });
    }

    removeCartCookie(){
        $.removeCookie('cart-'+this.getStoreId(''), {path: '/'});
    }
}