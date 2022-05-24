import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';
import { TeV2AemService } from '../te-v2-aem.service';
import { SettingsHelperService } from './setting-helper.service';
import { CommerceUtils } from '../utils/commerceUtils';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AnonymousUserCookies } from './anonymous-user-cookies.service';

declare let $: any;
@Injectable({
    providedIn: 'root'
})
export class SwitchCartService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private _logger: LoggerService, private http: HttpClient, private _commerceUtils: CommerceUtils, 
        private _anonymousUserCookies: AnonymousUserCookies) { }

    navigateToNewStore(country: any, url: any) {
        let API_URL = `/bin/te/commerce/shop/switchCart`;
        let params = { targetCountry: country };
        return this.http.post(API_URL, params).pipe(
            map((data: any) => {
                let iso = country.toLowerCase();
                this._commerceUtils.removeCartCookie();
                this._commerceUtils.setCartCookie(data.guid, 3650, iso);
                let siteCountry = iso === 'usa' ? iso : 'global';
                this._logger.info('cross store link clicked - ISO=', iso, 'URL=', url, 'siteCountry=', siteCountry);
                this._anonymousUserCookies.setCountryInfoCookie(iso, 3650);
                this._anonymousUserCookies.setSiteInfoCookie(siteCountry, 'en', 3650);
                //below session storage is used to show/hide yellow box in shopping/checkout page
                window.sessionStorage.setItem('isSwitchedCart', JSON.stringify({ switched: true }));
                window.location.href = url;
            }), catchError(error => {
                return this.error(error);
            })
        )
    }

    error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}