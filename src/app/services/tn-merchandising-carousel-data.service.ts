import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';
import { TeV2AemService } from '../te-v2-aem.service';
import { CommerceUtils } from '../utils/commerceUtils';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class TnMerchandisingCarouselDataService {

  constructor(
    private teV2: TeV2AemService,
    private commerceUtils: CommerceUtils,
    private logger: LoggerService,
    private http: HttpClient) { }

  async retreiveProducts(tcpnList: any, inStockOnly: any) {
    let tcpnLengthCheck = tcpnList.length <= 520 ? true : false;
    let url = this.teV2.urls.teccatv2Externalhost + '/teccatv2/service/product/list-by-tcpns/';

    let data: any = {
      s: 12,
      c: this.teV2.settings.country,
      l: this.teV2.settings.lang,
      tcpns: tcpnList,
      o: 0,
      po: 'y', // promoted products only
      rand: 'y',
      rollup: 'modified', // rollup only when more than one product is present
      smode: 'pao', // disable filter results
      mediaType: 'jsonns',
      has_ida: 'y', // return products that have image + product description + product attributes
      storeid: '',
      instock: '',
      dist_region: ''
    };

    if (this.commerceUtils.isCommerceEnabled()) {
      // pass the store name
      data.storeid = this.commerceUtils.getStoreId();
      // return products that are only in stock
      if (inStockOnly !== '') {
        data.instock = 'store';
      } else {
        data.dist_region = this.teV2.settings.distributorRegion;
      }
    } else {
      data.dist_region = this.teV2.settings.distributorRegion;
    }

    data = tcpnLengthCheck ? data : $.param(data);


    const getMethod = () => {
      if (tcpnLengthCheck) {
        return {
          method: 'GET',
          url: url,
          params: data,
          cache: false
        };
      } else {
        return {
          method: 'POST',
          url: url,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' },
          cache: false
        };
      }
    }

    this.logger.info('Merchandising Carousel - curated data service: Url = ' + url + "  [tcpnList] = " + tcpnList + " [params] = " + JSON.stringify(data));

    if (typeof tcpnList !== "undefined" && tcpnList !== '') {
      try{
        const responseData: any = await (this.http.request<any>(getMethod() as any)).toPromise();
        if(responseData) {
          let storeFeaturedProductsData: any = {};
          try {
            storeFeaturedProductsData.products = responseData.results !== undefined && responseData.results.products !== undefined ? responseData.results.products : {};
            storeFeaturedProductsData.currency = responseData.results.currency || '';
          } catch (e) {
            this.logger.error(e);
          }
        }
        return responseData;
      } catch(e) {
        console.warn('ERROR! from retreiveProducts(): ', e);
      }

    }
  }

  async retreiveFeedProducts(feedUrl: string, inStockOnly: string, facetSelected: string) {

    let url = this.teV2.urls.teccatv2Externalhost + feedUrl;

    let params: any = {};
    params.c = this.teV2.settings.country;
    params.l = this.teV2.settings.lang;
    params.s = 12;
    params.o = 0;
    params.mediaType = 'jsonns';
    params.po = 'y';
    params.rollup = 'modified'; // rollup only when more than one prodcut is present
    params.smode = 'pao'; // disable filter results
    params.rand = 'y';
    params.has_ida = 'y';
    // pass the filters applied
    if (facetSelected.trim() !== "" && facetSelected.trim().length > 0) {
      params.n = facetSelected;
    }
    // determine whether current country is commerce enabled
    if (this.commerceUtils.isCommerceEnabled()) {
      params.storeid = this.teV2.store.storeId;
      // return products that are only in stock
      if (inStockOnly) {
        params.instock = 'store';
      } else {
        params.dist_region = this.teV2.settings.distributorRegion;
      }
    } else {
      params.dist_region = this.teV2.settings.distributorRegion;
    }

    this.logger.info('Merchandising Carousel - feed data service: Url = ' + url + "  params = " + JSON.stringify(params));

    try{
      const responseData: any = await this.http.request<any>('GET', url, params).toPromise();
      if(responseData) {
        let storeFeaturedProductsData: any = {};
        try {
          storeFeaturedProductsData.products = responseData.results !== undefined && responseData.results.products !== undefined ? responseData.results.products : {};
          storeFeaturedProductsData.currency = responseData.results.currency || '';
        } catch (e) {
          this.logger.error(e);
        }
      }
      return responseData;
    } catch(e) {
      console.warn('ERROR! from retreiveProducts(): ', e);
    }
  }
}
