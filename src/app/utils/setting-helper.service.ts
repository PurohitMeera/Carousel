import { Injectable } from '@angular/core';
import { TeV2AemService } from '../te-v2-aem.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsHelperService {


  constructor(private _teV2Service: TeV2AemService) { }


  envHost(url?: any, secure?: any) {
    var domain: any;
    var protocol = secure || window.location.protocol === 'https:' ? 'https:' : 'http:';
    var teV2 = this._teV2Service.getTeV2Array() || {};
    var settings = teV2.settings || {};
    var cmsSettings = teV2.cmsSettings || {};
    var regEx = new RegExp(/teccatv2/);
    var isTecCatV2 = regEx.exec(url);//test
    var commerceRegEx = new RegExp(/commerce/);
    var isCommerce = commerceRegEx.test(url);
    var newUrl;

    domain = protocol + "//";
    if (url.indexOf('//') > -1) {
      newUrl = url;
    } 
      else {
      if (url.indexOf('/') > -1) {
        url = url.substring(url.indexOf('/') + 1, url.length);
      }
      if ((cmsSettings.defaultEnvironment && cmsSettings.defaultEnvironment === "LOCAL") || (this._teV2Service.getTeV2Array() && this._teV2Service.settings.isEditMode === true)) {
        if (cmsSettings.defaultEnvironment === "LOCAL" && teV2.supportURLSettings.proxyServices) {
          domain += window.location.host + '/proxy';
        } else if (cmsSettings.defaultEnvironment === "LOCAL" && isCommerce) {
          domain += window.location.host;
        } else if (cmsSettings.defaultEnvironment === "LOCAL" && settings.plDevMode) {
          domain += window.location.host + '/etc/designs/te/mocks';
        } else {
          if (isTecCatV2) {
            domain = teV2.urls.teccatv2Externalhost;
          } else if (isCommerce) {
            domain += teV2.supportURLSettings.tehost;
          } else {
            domain += window.location.host;
          }
        }
      } else {
        if (settings.isDesignMode || settings.isEditMode || settings.isPreviewMode) {
          if (isTecCatV2) {
            domain = teV2.urls.teccatv2Internalhost;
          } else {
            domain += teV2.supportURLSettings.tehost;
          }
        } else {
          domain += window.location.host;
        }
      }
      newUrl = domain + '/' + url;
    }
    return newUrl;
  }
}
