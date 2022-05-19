import { Injectable} from '@angular/core';
import { LoggerService } from '../logger.service';
import { TeV2AemService } from '../te-v2-aem.service';
import { SettingsHelperService } from './setting-helper.service';
declare let $: any;
@Injectable({
    providedIn: 'root'
  })
  export class CartService  {
    lastDefer: any;
    constructor(private _teService: TeV2AemService,  private _settingsHelperService: SettingsHelperService, private _logger: LoggerService) {}
    ngOnInit(): void {
        
    }

    getShoppingCartSummary() {
        var secure = (this._teService.getTeV2Array().settings.isEditMode === true || this._teService.getTeV2Array().cmsSettings.defaultEnvironment === 'LOCAL') ? false : true;
        this.lastDefer = $q.defer();
        var url = this._settingsHelperService.envHost('/bin/te/commerce/shop/getShoppingCart?ts=' + Math.random(), secure);
        let params = {sitePath: '', country: '', language: ''};
        params.sitePath = this._teService.getTeV2Array().settings.sitePath;
        params.country = this._teService.getTeV2Array().settings.country;
        params.language = this._teService.getTeV2Array().settings.lang;
        
        $http({
            method: 'GET',
            url: url,
            params: params,
            cache: false
        }).success(this.getCartSuccess).
        error(this.getCartError);

        return this.lastDefer.promise;
    }

    getCartSuccess(data:any) {
        this.lastDefer.resolve(data);
    }

    getCartError(data: any, status: any, headers: any, config: any) {
        this._logger.error('ERROR!', data, status, headers, config);
        this.lastDefer.reject('Error while getting shopping cart data');
    }
      
  }