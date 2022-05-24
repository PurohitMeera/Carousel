import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';
import { TeV2AemService } from '../te-v2-aem.service';
import { SettingsHelperService } from './setting-helper.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
declare let $: any;
@Injectable({
    providedIn: 'root'
})
export class CartService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private _teService: TeV2AemService, private _settingsHelperService: SettingsHelperService,
        private _logger: LoggerService, private http: HttpClient) { }

    setShoppingCountry(countryIso: any): Observable<any> {
        let API_URL = `/bin/te/commerce/shop/setDeliveryCountry`;
        let params = { countryIso: countryIso };
        return this.http.post(API_URL, params).pipe(catchError(this.error));

        // var params = { countryIso: '' };
        // var lastDefer = $q.defer();
        // var secure = (this._teService.getTeV2Array().ns('settings').isEditMode === true) ? false : true;
        // var url = this._settingsHelperService.envHost('/bin/te/commerce/shop/setDeliveryCountry', secure);
        // params.countryIso = countryIso;
        // let that = this;
        // $http({
        //     method: 'POST',
        //     url: url,
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     params: params
        // }).success(function (lastDefer) {
        //     return function (responseData: any) {
        //         var data = {};
        //         try {
        //             data = responseData || {};
        //         } catch (e) {
        //             that._logger.error(e);
        //             lastDefer.reject();
        //             return;
        //         }
        //         return lastDefer.resolve(data);
        //     };
        // }(lastDefer))
        //     .error(function (lastDefer) {
        //         return function (data: any, status: any, headers: any, config: any) {
        //             that._logger.warn('ERROR!', data, status, headers, config);
        //             lastDefer.reject(data);
        //         };
        //     }(lastDefer));

        // return lastDefer.promise;
    }
    getShoppingCartSummary(): Observable<any> {
        let params = {
            sitePath: this._teService.getTeV2Array().settings.sitePath,
            country: this._teService.getTeV2Array().settings.country,
            language: this._teService.getTeV2Array().settings.lang
        };
        let secure = (this._teService.getTeV2Array().settings.isEditMode === true || this._teService.getTeV2Array().cmsSettings.defaultEnvironment === 'LOCAL') ? false : true;
        let API_URL = this._settingsHelperService.envHost('/bin/te/commerce/shop/getShoppingCart?ts=' + Math.random(), secure);
        return this.http.get(API_URL, { params: params }).pipe(catchError(this.error));

        // var secure = (this._teService.getTeV2Array().settings.isEditMode === true || this._teService.getTeV2Array().cmsSettings.defaultEnvironment === 'LOCAL') ? false : true;
        // this.lastDefer = $q.defer();
        // var url = this._settingsHelperService.envHost('/bin/te/commerce/shop/getShoppingCart?ts=' + Math.random(), secure);
        // let params = { sitePath: '', country: '', language: '' };
        // params.sitePath = this._teService.getTeV2Array().settings.sitePath;
        // params.country = this._teService.getTeV2Array().settings.country;
        // params.language = this._teService.getTeV2Array().settings.lang;

        // $http({
        //     method: 'GET',
        //     url: url,
        //     params: params,
        //     cache: false
        // }).success(this.getCartSuccess).
        //     error(this.getCartError);

        // return this.lastDefer.promise;
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