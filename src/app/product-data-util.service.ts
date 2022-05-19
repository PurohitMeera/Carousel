import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../app/logger.service';
import { CommerceUtils } from '../app/utils/commerceUtils';
import { SettingsHelperService } from '../app/utils/setting-helper.service';
import { TeV2AemService } from '../app/te-v2-aem.service';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class ProductDataUtilService {

  constructor(
    private _teService: TeV2AemService,
    // private teV2: TeV2AemService,
    private commerceUtils: CommerceUtils,
    private logger: LoggerService,
    private settingsHelperService: SettingsHelperService,
    private http: HttpClient) { }

  name = 'tnProductDataUtilService';


  formatProducts(data: any, system: any) {
    let arr: any[] = data.searchItems;
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i] = this.formatProductWithExtraProperties(data, arr[i], system);
    }
    return arr;
  }
  formatProductWithExtraProperties(data: any, product: any, system: any) {
    product.currencyIso = data.currency || '';
    product.distributorCurrIso = data.distributorCurrency || '';
    product = this.formatProduct(product, system);
    return product;
  }
  formatProduct(product: any, system?: any) {
    if (!product.alreadyFormated) {
      this.formatThumbnail(product);
      this.formatStatus(product);
      this.buildProductUrl(product);
      this.buildPLPUrl(product);
      this.addLocalizedLabels(product);
      this.buildAliases(product);
      this.buildComplicanceUrl(product);
      this.buildCompliances(product);
      this.buildProductSeries(product);
      this.buildProductFamily(product);
      this.formatForLineBreaks(product);
      this.buildFlattedFeatures(product, system);
      this.buildProductCategoryPLPUrl(product);
      this.isInStock(product);
    }
    product.alreadyFormated = true;
    return product;
  }
  productsPrimaryToFlattendFeatures(arr: any[], system: any) {
    if (!arr) {
      this.logger.warn('no products passed into productsPrimaryToFlattendFeatures');
      return;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
      this.buildFlattedFeatures(arr[i], system);
    }
    return arr;
  }
  buildFlattedFeatures(product: any, system: any) {
    if (!product) {
      this.logger.warn('no product passed into setProductsPrimaryFeaturesToSystem');
      return;
    }

    this.buildFlattenedFeatures(product, system);
    return product;
  }
  flattenedValues(values: any, propertyName: any, separator?: any) {
    let resultedValues: any[] = [];
    separator = separator || ', ';

    for (var i = 0, ln = values.length; i < ln; i++) {
      resultedValues.push(values[i][propertyName]);
    }

    return resultedValues.join(separator);
  }
  buildFlattenedFeatures(product: any, system: any) {
    let flattenedFeatures: any[] = [];
    if (product.primaryFeatures) {
      for (var groupIndex = 0; groupIndex < product.primaryFeatures.length; groupIndex++) {
        var feature = product.primaryFeatures[groupIndex];
        if (feature) {
          var secondaryUnit = feature.secondaryUnit,
            systemValues;

          if (secondaryUnit && system && (secondaryUnit.system.toLowerCase() === system.toLowerCase() || (secondaryUnit.system.toLowerCase() != system.toLowerCase() && feature.primaryValues && feature.primaryValues.length === 0))) {
            systemValues = feature.secondaryValues;
          } else {
            systemValues = feature.primaryValues;
          }

          if (systemValues && systemValues.length) {
            flattenedFeatures.push({
              label: feature.label,
              value: this.flattenedValues(systemValues, 'displayValue'),
              code: feature.code
            });
          }
        }
      }
    }
    product.flattenedFeatures = flattenedFeatures;
    return product;
  }
  formatForLineBreaks(product: any) {
    if (product.description && product.description !== null) {
      product.description = product.description.replace(/,/g, ', ');
      product.description = product.description.replace(/([^ \s-]{18})/, '$1 ');
    }
    return product;
  }
  buildProductUrl(product: any) {
    if (this._teService.settings.isEditMode) {
      product.productUrl = this._teService.settings.sitePath + '/' + 'product-' + product.tcpn + '.html';
    } else {
      product.productUrl = this._teService.urls.teccatv2Externalhost + '/' + this._teService.settings.country + "-" + this._teService.settings.lang + '/' + 'product-' + product.tcpn + '.html';
    }
    return product;
  }
  buildPLPUrl(product: any) {
    var plpUrl = "";
    if (window.location.href.indexOf('plp') >= 0) {
      if (product.crumbTrail && product.crumbTrail.crumbTrailItems && product.crumbTrail.crumbTrailItems.length > 0) {
        if (product.primaryFeatures && product.primaryFeatures.length > 0) {
          for (var i = 0; i < product.primaryFeatures.length; i++) {
            if (product.primaryFeatures[i].primaryValues && product.primaryFeatures[i].primaryValues.length > 0) {
              for (var j = 0; j < product.primaryFeatures[i].primaryValues.length; j++) {
                if (product.primaryFeatures[i].primaryValues[j].dimValId) {
                  if (plpUrl.indexOf('?d') >= 0) {
                    plpUrl += ' ' + product.primaryFeatures[i].primaryValues[j].dimValId;
                  } else {
                    plpUrl += '?d=' + product.primaryFeatures[i].primaryValues[j].dimValId;
                  }
                }
              }
            }
          }
        }
      } else {
        plpUrl = '#';
      }
    } else {
      if (this._teService.settings.isEditMode) {
        plpUrl = this._teService.settings.sitePath + '/' + "search.html?";
      } else {
        plpUrl = '/' + this._teService.settings.country + "-" + this._teService.settings.lang + '/' + "search.html?";
      }

      if (product.crumbTrail && product.crumbTrail.crumbTrailItems && product.crumbTrail.crumbTrailItems.length > 0) {
        var lastItem = product.crumbTrail.crumbTrailItems[product.crumbTrail.crumbTrailItems.length - 1];
        plpUrl += 'q=&n=' + lastItem.id;
        if (product.primaryFeatures && product.primaryFeatures.length > 0) {
          for (var m = 0; m < product.primaryFeatures.length; m++) {
            if (product.primaryFeatures[m].primaryValues && product.primaryFeatures[m].primaryValues.length > 0) {
              for (var n = 0; n < product.primaryFeatures[m].primaryValues.length; n++) {
                if (product.primaryFeatures[m].primaryValues[n].dimValId) {
                  if (plpUrl.indexOf('&d') >= 0) {
                    plpUrl += ' ' + product.primaryFeatures[m].primaryValues[n].dimValId;
                  } else {
                    plpUrl += '&d=' + product.primaryFeatures[m].primaryValues[n].dimValId;
                  }
                }
              }
            }
          }
        }
      } else {
        plpUrl = '#';
      }
    }
    product.plpUrl = plpUrl;
    return product;
  }
  buildProductCategoryPLPUrl(product: any) {
    var productCategoryPLPUrl = "";
    if (product.crumbTrail && product.crumbTrail.crumbTrailItems && product.crumbTrail.crumbTrailItems.length > 0) {
      var lastItem = product.crumbTrail.crumbTrailItems[product.crumbTrail.crumbTrailItems.length - 1].canonical;
      if (this._teService.settings.isEditMode) {
        productCategoryPLPUrl = this._teService.settings.sitePath + '/plp/' + lastItem + ".html";
      } else {
        productCategoryPLPUrl = '/' + this._teService.settings.country + "-" + this._teService.settings.lang + '/plp/' + lastItem + ".html";
      }
    }
    product.productCategoryPLPUrl = productCategoryPLPUrl;
    return product;
  }
  formatThumbnail(product: any) {
    //fix the image.
    var image = this._teService.urls.noProductImage;
    var alt = '';

    if (product.images && product.images.length > 0) {
      if (product.images[0].imageUrl) {
        image = product.images[0].imageUrl;
      } else {
        image = product.images[0].path + product.images[0].imageName;
      }
      if (product.images[0].alt) {
        alt = product.images[0].alt;
      }
    }
    // The below condition has been used to avoid the setting of thumbnailUrl to no-image-available.jpg
    // in case of get sample link on PLP/SRP grid. In this scenario, product.thumbnailUrl is passed as data attribute
    // hence the above if conditions don't get evaluated and product.thumbnailUrl is set to no-image-available.jpg
    if (!product.thumbnailUrl) {
      product.thumbnailUrl = image;
    }

    product.thumbnailAlt = alt;
  }
  formatStatus(product: any) {

    var iconClass = "",
      newPartStatus;

    if (product.status) {
      switch (product.status.toLowerCase()) {
        case "active":
          iconClass = "icon-active";
          break;
        case "nrd":
          iconClass = "fa fa-ban";
          break;
        case "pending discontinuance":
          iconClass = "icon-pending-obsolescence";
          break;
        case "obsolete":
          iconClass = "icon-obsolete";
          break;
        case "superseded":
          iconClass = "icon-superseded";
          break;
        case "preliminary":
          iconClass = "icon-preliminary";
          break;
        case "restricted":
          iconClass = "icon-restricted";
          break;
      }

      newPartStatus = product.status.toLowerCase().replace(' ', '-');
    }

    product.productPartStatus = this._teService.localization.productPartStatus[newPartStatus];
    product.iconClass = iconClass;
  }
  addLocalizedLabels(product: any) {
    product.productTileLabel = this._teService.localization.resultsTiles.productTileLabel;
    product.saveToListLabel = this._teService.localization.resultsTiles.saveToListLabel;
    product.shareLabel = this._teService.localization.resultsTiles.shareLabel;
    product.quickViewLabel = this._teService.localization.resultsTiles.quickViewLabel;
    product.viewLessLabel = this._teService.localization.resultsTiles.viewLessLabel;
    product.teInternalNumberLabel = this._teService.localization.resultsTiles.teInternalNumberLabel;
    product.teMatchingPartNumber = this._teService.localization.resultsTiles.teMatchingPartNumber;
    product.teViewMore = this._teService.localization.resultsTiles.teViewMore;
    product.milSpecIdLabel = this._teService.localization.resultsTiles.milSpecIdLabel;
    product.aliasIdLabel = this._teService.localization.resultsTiles.aliasIdLabel;
    product.competitorPartMatch = this._teService.localization.resultsTiles.competitorPartMatch;
    product.competitorName = this._teService.localization.resultsTiles.competitorName;
    product.competitorPartNumber = this._teService.localization.resultsTiles.competitorPartNumber;
    product.competitorDescription = this._teService.localization.resultsTiles.competitorDescription;
    product.commentsVariances = this._teService.localization.resultsTiles.commentsVariances;

    return product;
  }
  buildAliases(product: any) {
    var newAliases = [];
    if (product.aliasNameAndStatus && product.aliasNameAndStatus.length) {
      for (var i = 0, len = product.aliasNameAndStatus.length; i < len; i++) {
        if (product.aliasNameAndStatus[i].productAliasStatus == "P_otherPartNumber") {
          newAliases.push(product.aliasNameAndStatus[i].productAliasNbr);
        }
      }
    }
    product.aliasNumbers = newAliases;
    return product;
  }
  buildProductFamily(product: any) {
    var productFamily;
    if (product.productFamily &&
      product.productFamily.crumbTrailItems &&
      product.productFamily.crumbTrailItems.length) {
      for (var k = 0, lenk = product.productFamily.crumbTrailItems.length; k < lenk; k++) {
        productFamily = product.productFamily.crumbTrailItems[k];
      }
    }
    product.productFamily = productFamily;
    return product;
  }
  buildProductSeries(product: any) {
    var productSeries = [];
    if (product.seriesTrail &&
      product.seriesTrail.crumbTrailItems &&
      product.seriesTrail.crumbTrailItems.length) {
      for (var l = 0, lenl = product.seriesTrail.crumbTrailItems.length; l < lenl; l++) {
        productSeries.push(product.seriesTrail.crumbTrailItems[l]);
      }
    }
    product.productSeries = productSeries;

    return product;
  }
  buildCompliances(product: any) {
    var newCompliances = [];
    if (product.elvRohsComplianceCodes) {
      for (var j = 0, lenj = product.elvRohsComplianceCodes.length; j < lenj; j++) {
        var complianceCode = product.elvRohsComplianceCodes[j];
        var complianceValue = this._teService.localization.productCompliance[complianceCode + ''];
        if (complianceValue) {
          newCompliances.push({
            code: complianceCode,
            label: complianceValue
          });
        }
      }
    }

    product.complianceCodes = newCompliances;
    return product;
  }
  isInStock(product: any) {
    product.inStore = (product.storeInfo) ? product.storeInfo.inStore === 'true' : false;
    product.inStock = (product.storeInfo) ? product.storeInfo.inStock === 'true' : false;
    product.minPrice = (product.storeInfo) ? this.commerceUtils.getFormattedCurrency(product.currencyIso, product.storeInfo.minPrice) : '0';
    product.inGlobalStock = (product.distributorInfo) ? product.distributorInfo.inStock === 'true' : false;
    return product;
  }
  buildComplicanceUrl(product: any) {
    product.complianceUrl = this.settingsHelperService.envHost(this._teService.urls.complianceUrl).replace('<tcpn>', product.tcpn);
    return product;
  }
  returnPrimaryUnit(headerFeaturesObj: any) { // STB-424 fix
    if (headerFeaturesObj.primaryUnit && headerFeaturesObj.primaryUnit.code && headerFeaturesObj.primaryUnit.system == $.cookie('TECmp1'))
      return " (" + headerFeaturesObj.primaryUnit.code + ")";
    else if (headerFeaturesObj.secondaryUnit && headerFeaturesObj.secondaryUnit.code && headerFeaturesObj.secondaryUnit.system == $.cookie('TECmp1'))
      return " (" + headerFeaturesObj.secondaryUnit.code + ")";
    else
      return "";
  }
  buildGridHeader(headFilter: any, competitorMatch: any) {

    var headColVal = [];

    headColVal = [{
      "sequence": "0",
      "code": 'doclinks',
      "numeric": "false",
      "label": this._teService.localization.searchResults.mdpDocumentsText
    },
    {
      "sequence": "-1",
      "code": "TEpart",
      "numeric": "false",
      "label": this._teService.localization.searchResults.mdpTEpartText
    }];

    if (competitorMatch !== undefined && (competitorMatch === 'simple' || competitorMatch === 'complex')) {
      headColVal.push({
        "sequence": "-2",
        "code": "competitorPartMatch",
        "numeric": "false",
        "label": this._teService.localization.resultsTiles.competitorPartMatchNotes
      });
    }

    for (var h = 0; h < headFilter.length; h++) {
      if (headFilter[h].features.length) {
        for (var fe = 0; fe < headFilter[h].features.length; fe++) {
          headColVal.push({
            "sequence": headFilter[h].features[fe].sequence.toString(),
            "code": headFilter[h].features[fe].code,
            "numeric": headFilter[h].features[fe].numeric,
            "label": headFilter[h].features[fe].label + this.returnPrimaryUnit(headFilter[h].features[fe])// STB-424 fix
          });
        }
      }
    }
    headColVal.sort(function (a: any, b: any) {
      return a.sequence - b.sequence;
    });
    headColVal.push({
      "sequence": (parseInt(headColVal[headColVal.length - 1].sequence) + 1).toString(),
      "code": 'rohs',
      "numeric": "false",
      "label": this._teService.localization.resultsTiles.rohsCompliance
    }, {
      "sequence": (parseInt(headColVal[headColVal.length - 1].sequence) + 2).toString(),
      "code": 'elv',
      "numeric": "false",
      "label": this._teService.localization.resultsTiles.elvCompliance
    }, {
      "sequence": (parseInt(headColVal[headColVal.length - 1].sequence) + 3).toString(),
      "code": 'familyLinks',
      "numeric": "false",
      "label": this._teService.localization.resultsTiles.productFamilies
    }, {
      "sequence": (parseInt(headColVal[headColVal.length - 1].sequence) + 4).toString(),
      "code": 'serieslinks',
      "numeric": "false",
      "label": this._teService.localization.resultsTiles.seriesLinks
    });
    return headColVal;
  }
}














