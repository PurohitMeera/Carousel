import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TeV2AemService } from '../te-v2-aem.service';
import { CommerceUtils } from '../utils/commerceUtils';
import { LoggerService } from '../logger.service';
import { CommonUtils } from '../utils/commonUtils';
import { UrlHelpersService } from '../utils/url-helpers.service';
import { CartService } from '../utils/cart.service';
import { SwitchCartService } from '../utils/switch-cart.service';

declare let $: any;
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  cartTransferMessage: any;
  cartLoading = true;
  showLoginMessage = false;
  acceptedPayments = this._teService.getTeV2Array().paymentMethodlogos.list;
  showAcceptedPayments = this._teService.getTeV2Array().localization.formLabels.acceptedPaymentMethodsOnOffToggle === 'ON';
  samplesCountry = this._commerceUtils.isSamplesStore();
  isCommerceCountry = this._commerceUtils.isCommerceEnabled();
  isTESOGStore = this._commerceUtils.isCurrentSiteTESOG();
  isSamplesCountryAndGuestUser = this._commerceUtils.isSamplesStore() && !this.isUserSignedIn();
  sampleShippedFreeCharge_tmp = this._teService.getTeV2Array().localization.formLabels.sampleShippedFreeCharge;
  shoppingCartTitle = this._teService.getTeV2Array().localization.formLabels.shoppingCartTitle;
  teStoreShoppingCart = this._teService.getTeV2Array().localization.formLabels.teStoreShoppingCart;
  shippingRestrictionLabel = this._teService.getTeV2Array().localization.formLabels.shippingRestrictionLabel;
  tesogShippingRestrictionLabel = this._teService.getTeV2Array().localization.formLabels.tesogShippingRestrictionLabel;
  teConnectivityShipOnline = this._teService.getTeV2Array().localization.formLabels.teConnectivityShipOnline;
  viewCountryList = this._teService.getTeV2Array().localization.formLabels.viewCountryList;
  mixedCartSummaryCommerce = this._teService.getTeV2Array().localization.formLabels.mixedCartSummaryCommerce;
  itemsLabel = this._teService.getTeV2Array().localization.formLabels.itemsLabel;
  mixedCartSummarySample = this._teService.getTeV2Array().localization.formLabels.mixedCartSummarySample;
  freeLabelSamples = this._teService.getTeV2Array().localization.formLabels.freeLabelSamples;
  checkoutErrBelowLabel = this._teService.getTeV2Array().localization.formLabels.checkoutErrBelowLabel;
  samplesContinueShopping = this._teService.getTeV2Array().localization.formLabels.samplesContinueShopping;
  continueShopping = this._teService.getTeV2Array().localization.formLabels.continueShopping;
  samplesCheckout = this._teService.getTeV2Array().localization.formLabels.samplesCheckout;
  checkoutLabel = this._teService.getTeV2Array().localization.formLabels.checkoutLabel;
  itemsUnableTransferred = this._teService.getTeV2Array().localization.formLabels.itemsUnableTransferred;
  onlyFreeSampleItems = this._teService.getTeV2Array().localization.formLabels.onlyFreeSampleItems;
  productRemovedMessage = this._teService.getTeV2Array().localization.formLabels.productRemovedMessage;
  unexpectedErrorMessage = this._teService.getTeV2Array().localization.formLabels.unexpectedErrorMessage;
  callSupportErrorMessage = this._teService.getTeV2Array().localization.formLabels.callSupportErrorMessage;
  cartUpdatedMessage = this._teService.getTeV2Array().localization.formLabels.cartUpdatedMessage;
  loginPromptMessage = this._teService.getTeV2Array().localization.formLabels.loginPromptMessage;
  productAvailableInternationally = this._teService.getTeV2Array().localization.formLabels.productAvailableInternationally;
  oneItemInStockLabel = this._teService.getTeV2Array().localization.formLabels.oneItemInStockLabel;
  moreItemsInStockLabel = this._teService.getTeV2Array().localization.formLabels.moreItemsInStockLabel;
  productLabel = this._teService.getTeV2Array().localization.formLabels.productLabel;
  availabilityLabel = this._teService.getTeV2Array().localization.formLabels.availabilityLabel;
  unitPriceLabel = this._teService.getTeV2Array().localization.formLabels.unitPriceLabel;
  quantityLabel = this._teService.getTeV2Array().localization.formLabels.quantityLabel;
  extendedPriceLabel = this._teService.getTeV2Array().localization.formLabels.extendedPriceLabel;
  laddIneligibleItemMsg = this._teService.getTeV2Array().localization.formLabels.laddIneligibleItemMsg;
  tesogIneligibleItemMsg = this._teService.getTeV2Array().localization.formLabels.tesogIneligibleItemMsg;
  teusaIneligibleItemMsg = this._teService.getTeV2Array().localization.formLabels.teusaIneligibleItemMsg;
  inStockLabel = this._teService.getTeV2Array().localization.merchandisingCarousel.inStockLabel;
  //shippingMessageCode = this._teService.getTeV2Array().localization.commerceCodeLabels[this.cartEntry.product.shippingMessageCode];
  viewMoreLabel = this._teService.getTeV2Array().localization.formLabels.viewMoreLabel;
  viewLessLabel = this._teService.getTeV2Array().localization.formLabels.viewLessLabel;
  packagingLabel = this._teService.getTeV2Array().localization.formLabels.packagingLabel;
  deleteLabel = this._teService.getTeV2Array().localization.formLabels.deleteLabel;
  oneMTOItemLabel = this._teService.getTeV2Array().localization.formLabels.oneMTOItemLabel;
  moreMTOItemsLabel = this._teService.getTeV2Array().localization.formLabels.moreMTOItemsLabel;
  mtoShippingtoCountryMessage = this._teService.getTeV2Array().localization.formLabels.mtoShippingtoCountryMessage;
  mtoNonCancelableMessage = this._teService.getTeV2Array().localization.formLabels.mtoNonCancelableMessage;
  productShipToUsaOnlyLabel = this._teService.getTeV2Array().localization.formLabels.productShipToUsaOnlyLabel;
  specialOrderLabel = this._teService.getTeV2Array().localization.merchandisingCarousel.specialOrderLabel;
  specialOrderShippingMsg = this._teService.getTeV2Array().localization.commerceLabels.specialOrderShippingMsg;
  sampleItem = this._teService.getTeV2Array().localization.formLabels.sampleItem;
  productSamples = this._teService.getTeV2Array().localization.formLabels.productSamples;
  availabilitySamples = this._teService.getTeV2Array().localization.formLabels.availabilitySamples;
  unitPriceSamples = this._teService.getTeV2Array().localization.formLabels.unitPriceSamples;
  quantitySamples = this._teService.getTeV2Array().localization.formLabels.quantitySamples;
  extendedPriceSamples = this._teService.getTeV2Array().localization.formLabels.extendedPriceSamples;
  inStockSamples = this._teService.getTeV2Array().localization.formLabels.inStockSamples;
  backordered = this._teService.getTeV2Array().localization.formLabels.backordered;
  lowInventory = this._teService.getTeV2Array().localization.formLabels.lowInventory;
  backorderText = this._teService.getTeV2Array().localization.formLabels.backorderText;
  inventoryText = this._teService.getTeV2Array().localization.formLabels.inventoryText;
  backorderTooltip = this._teService.getTeV2Array().localization.formLabels.backorderTooltip;
  inventoryTooltip = this._teService.getTeV2Array().localization.formLabels.inventoryTooltip;
  freeSamples = this._teService.getTeV2Array().localization.formLabels.freeSamples;
  buyMoreFromTheTeStoreLabel = this._teService.getTeV2Array().localization.formLabels.buyMoreFromTheTeStoreLabel;
  packagingSamples = this._teService.getTeV2Array().localization.formLabels.packagingSamples;
  outofstockmsg = this._teService.getTeV2Array().localization.formLabels.outofstockmsg;
  buyMoreFromTeStoreLabel = this._teService.getTeV2Array().localization.formLabels.buyMoreFromTeStoreLabel;
  homePagelink = this._teService.getTeV2Array().localization.formLabels.homePagelink;
  emptyCartLabel = this._teService.getTeV2Array().localization.formLabels.emptyCartLabel;
  learnOrderingLabel = this._teService.getTeV2Array().localization.formLabels.learnOrderingLabel;
  learnSampleLabel = this._teService.getTeV2Array().localization.formLabels.learnSampleLabel;
  acceptedPaymentMethods = this._teService.getTeV2Array().localization.formLabels.acceptedPaymentMethods;
  teusaCrossStoreFootMsg = this._teService.getTeV2Array().localization.formLabels.teusaCrossStoreFootMsg;
  tesogCrossStoreFootMsg = this._teService.getTeV2Array().localization.formLabels.tesogCrossStoreFootMsg;
  faq = this._teService.getTeV2Array().localization.formLabels.faq;
  samplesFaqDesc = this._teService.getTeV2Array().localization.formLabels.samplesFaqDesc;
  returns = this._teService.getTeV2Array().localization.formLabels.returns;
  returnsDescription = this._teService.getTeV2Array().localization.formLabels.returnsDescription;
  taxExemptionMsg = this._teService.getTeV2Array().localization.formLabels.taxExemptionMsg;
  taxExemptionModalLink = this._teService.getTeV2Array().localization.formLabels.taxExemptionModalLink;
  helpSection = this._teService.getTeV2Array().localization.formLabels.helpSection;
  shippingtoCountryLabel = this._teService.getTeV2Array().localization.formLabels.shippingtoCountryLabel;
  tesogCartsTransferredLabel = this._teService.getTeV2Array().localization.formLabels.tesogCartsTransferredLabel;
  itemLabel = this._teService.getTeV2Array().localization.formLabels.itemLabel;
  shippingLabel = this._teService.getTeV2Array().localization.formLabels.shippingLabel;
  shippingtoOthercountriesLabel = this._teService.getTeV2Array().localization.formLabels.shippingtoOthercountriesLabel;
  totalAmount = this._teService.getTeV2Array().localization.formLabels.totalAmount;
  checkoutErrAboveLabel = this._teService.getTeV2Array().localization.formLabels.checkoutErrAboveLabel;
  safetyAgencyApproval = this._teService.getTeV2Array().localization.formLabels.safetyAgencyApproval;
  safetyAgencyMessage = this._teService.getTeV2Array().localization.formLabels.safetyAgencyMessage;
  shippingTooltipHeadLabel = this._teService.getTeV2Array().localization.formLabels.shippingTooltipHeadLabel;
  sampleShippedFreeCharge = this.sampleShippedFreeCharge_tmp.replace("{1}", this._teService.getTeV2Array().ns('settings').country + '-' + this._teService.getTeV2Array().ns('settings').lang);
  country: any;
  sitePath: any;
  isShoppingCartEmpty: boolean = false;
  cartData: any;
  cartLabels: any;
  incoTermsMessages: any;
  deliveryCountry: string = '';
  sampleOnly: any;
  displayEmptyCartBannerOnSamples: any;
  dataUrl: string = '';
  formedTag: any;
  shipCountryList: any;
  isShipToCountryCommerce: any;
  cartTotalTax: any;
  cartCountry: any;
  mtoShippingRestrictionOnOffToggle: boolean = false;
  mtoRestrictionOn: any;
  laddRestrictionOn: any;
  shippingCost: any;
  teusaRestrictionOn: any;
  tesogRestrictionOn: any;
  totalPriceWithTax: any;
  taxValue: any;
  taxLabel: any;
  showBoxMessage: any;
  messageheader: any;
  messageContent: any;
  yellowBoxFootMsg: any;
  visitSite: string = '';
  checkForOnlyMtoProducts: any;
  shoppingPaymentInformation: any;
  shoppingPaymentTooltip: any;
  sectionSwitchError: boolean = true;

  constructor(private _teService: TeV2AemService, private _commerceUtils: CommerceUtils,
    private _logger: LoggerService, private _commonUtils: CommonUtils, private _urlHelpersService: UrlHelpersService,
    private _cartService: CartService, private location: Location, private _switchCartService: SwitchCartService) { }

  ngOnInit(): void {

  }

  isUserSignedIn() {
    let TECuso4 = $.cookie('TECuso4');
    return (TECuso4 && TECuso4.toLowerCase() === 'signed in'); // user directive has issues. its not available here
  }

  loadShoppingCart() {
    let that = this;
    setTimeout(() => {
      let session = window.sessionStorage.getItem("mini-cart-details");
      let currentCtry = this._commerceUtils.getCountry();
      let siteEnabled = this._teService.getTeV2Array().store && this._teService.getTeV2Array().store.storeType;

      if (this.isUserSignedIn() && siteEnabled && (!session || session !== currentCtry)) {
        this.doMiniCartAndCartCall();
      } else {
        this._cartService.getShoppingCartSummary().subscribe((res: any) => {
          that.getCartSuccess
        }, (error) => { that.getCartError })
      }
    }, 3000);
  }

  doMiniCartAndCartCall() {
    let that = this;
    this._commerceUtils.getMiniCartDetails().done(function (data: any) {
      that._cartService.getShoppingCartSummary().subscribe((res: any) => {
        that.getCartSuccess
      }, (error) => { that.getCartError })
    }, function (data: any) {
      that._logger.error('Mini Cart call error from shopping Cart', data);
    });
  }

  getCartError() {
    this.cartLoading = false;
    this._logger.error("Cart data could not be loaded ....");
  }

  getCartSuccess(cartData: any) {
    this._logger.info("Cart data loaded  successfully...");
    this._teService.getTeV2Array().ns('digitalData').shoppingCartData = cartData;//analytics
    let bannerForCommerceItems = this._teService.getTeV2Array().localization.formLabels.bannerForCommerceItems;
    let siteCountryList = this._commonUtils.getCountry(this._teService.getTeV2Array().samplesShipCountries.list, this._commerceUtils.getTwoCharacterCountryCode(this._teService.getTeV2Array().country));
    //based on the switched property in isSwitchedCart session storage the switched msg is shown when user has switched from other store
    let isSwitchedCart = window.sessionStorage.getItem('isSwitchedCart') ? JSON.parse(window.sessionStorage.getItem('isSwitchedCart')!) : '';
    if (isSwitchedCart && isSwitchedCart.switched) {
      let id3 = this._commerceUtils.getThreeCharacterCountryCode(siteCountryList.id);
      let unitText = this._commerceUtils.isShippingCountryTEUSA(id3) ? this._teService.getTeV2Array().localization.formLabels.dollarLabel : this._teService.getTeV2Array().localization.formLabels.euroLabel;
      this.cartTransferMessage = this._teService.getTeV2Array().localization.formLabels.switchedSiteCheckout.replace('{1}', siteCountryList.text).replace('{2}', unitText);
      window.sessionStorage.setItem('isSwitchedCart', JSON.stringify({ switched: false }));
    } else {
      this.cartTransferMessage = false;
    }
    this.country = this._commerceUtils.getCountry();
    this.sitePath = this._commonUtils.getSitePath();
    this.isShoppingCartEmpty = false;
    this.cartData = cartData;
    this.cartLabels = cartData.cartLabels;
    this.incoTermsMessages = cartData.incoTermMessages;
    let cartCount = cartData.totalItems;
    this.deliveryCountry = '';
    $(".cart-checkout-button,.checkout-button").removeClass("disableBtn");
    $(".cart-checkout-errMsg,.checkout-errMsg").addClass("hidediv");
    this.sampleOnly = cartData.cartType ? cartData.cartType.sampleOnly : this.samplesCountry;
    let sampleEntries = this.cartData.sampleEntries ? this.cartData.sampleEntries : [];
    let that = this;
    sampleEntries.forEach(function (obj: any) {
      if (obj.quantityValidationStatus !== 'VALID') {
        $(".cart-checkout-button,.checkout-button").addClass("disableBtn");
        $(".cart-checkout-errMsg,.checkout-errMsg").removeClass("hidediv");
        obj.quantitySpecialScenario = that._teService.getTeV2Array().localization.formLabels.quantitySpecialScenario.replace('{1}', obj.product.stock.stockLevel);
      }
    });
    this.cartData.sampleEntries = sampleEntries;
    //Scope.$broadcast('CART_COMPATIBLE_TCPN');
    // display samples banner only when user is signed in && transitioned from commerce cart
    this.displayEmptyCartBannerOnSamples = this.samplesCountry && this.isUserSignedIn() && (cartData && cartData.cartType && cartData.cartType.lastOpertatedCountry);
    this._logger.info("displayEmptyCartBannerOnSamples ", this.displayEmptyCartBannerOnSamples);
    if (this.displayEmptyCartBannerOnSamples) {
      let countryId = cartData.cartType.lastOpertatedCountry.isocode;
      let countryISOCode = this._commerceUtils.getThreeCharacterCountryCode(countryId);
      let countriesList = this._teService.getTeV2Array().shipToCountries.list;
      this._logger.info("countryId = " + countryId + "  countryISOCode = " + countryISOCode);
      /**FE18-11567 - When country is china domain sets with .cn for other country as well
      *So getExternalHost() util function is extended to return correct domain based on language 
      *and here domain is required is for next site and not current one.
      **/
      let countryLang = this._commerceUtils.getSitePathByCountry(countryISOCode);
      let nextSiteLang = countryLang.split('-')[1];
      this.dataUrl = this._commerceUtils.getExternalHost(nextSiteLang) + '/' + countryLang + '/commerce/shop/shopping-cart.html?iso=' + countryISOCode;
      let countryName;
      if (this._commonUtils.getCountry(countriesList, countryId) && this._commonUtils.getCountry(countriesList, countryId).text) {
        countryName = this._commonUtils.getCountry(countriesList, countryId).text;
      } else {
        countryName = this._commonUtils.getCountry(countriesList, "US").text;
      }
      let bannerLabel = "<a class='commerce-country'>" + countryName + "</a>";
      this.formedTag = bannerForCommerceItems ? bannerForCommerceItems.replace('{1}', bannerLabel) : '';
    }
    // No Product in the cart
    // Cart count becomes undefined, when signed in user kept the page idle for looooong time
    this.isShoppingCartEmpty = cartCount === undefined || cartCount === 0 || cartData.shoppingCartEmpty;
    let isItemAvailable = (!this.isShoppingCartEmpty && this.isUserSignedIn() && this.cartData.sampleEntries && this.cartData.sampleEntries.length > 0);
    window.sessionStorage.setItem('item-available', isItemAvailable);
    if (this.isUserSignedIn() || this.isShoppingCartEmpty) {
      window.sessionStorage.removeItem('cartItem-available');
    }
    let cartParam = 'cr';
    let baseurl = window.location.search;
    let params = this._urlHelpersService.extractQSParamsFromUrl(baseurl);
    let isCartItemAvailable = params && params.cr ? true : false;
    if (!this.isUserSignedIn() && (isCartItemAvailable || window.sessionStorage.getItem('cartItem-available') === 'true')) {
      this.showLoginMessage = true;
      window.sessionStorage.setItem('cartItem-available', 'true');
    }
    let updatedURL = this._urlHelpersService.removeParam(cartParam, baseurl);
    //location.url(updatedURL);
    //location.replace();
    // Below code is written when the end user perform right click operation on the footer countrysite link. 
    let isChinaDomain = $.cookie('site_info') == 'chn|zh';
    let countrySelector = $('.country-selector-wrapper li.footer-country-selector a');
    if (window.sessionStorage.getItem('item-available') === "true") {
      if (!isChinaDomain) {
        let chinaUrl = $(countrySelector).eq(2).attr('href');
        if (chinaUrl.indexOf("cr=Y") == -1) {
          $(countrySelector).eq(2).attr('href', chinaUrl.indexOf("?") == -1 ? chinaUrl + "?cr=Y" : chinaUrl + "&cr=Y");
        }
      }
      else {
        countrySelector.each(function () {
          if ($(that).attr('href').indexOf('chn-zh') == -1 && $(that).attr('href').indexOf("cr=Y") == -1) {
            $(that).attr('href', $(that).attr('href').indexOf("?") == -1 ? $(that).attr('href') + "?cr=Y" : $(that).attr('href') + "&cr=Y");
          }
        });
      }
    } else {
      countrySelector.each(function () {
        $(that).attr('href', $(that).attr('href').indexOf("?cr=Y") > -1 ? $(that).attr('href').replace("?cr=Y", '') : $(that).attr('href').replace("&cr=Y", ''));
      });
    }
    this.shipCountryList = (this._commerceUtils.isSamplesStore() || (this.cartData.cartType && this.cartData.cartType.sampleOnly)) ? this._teService.getTeV2Array().samplesShipCountries.list : this._teService.getTeV2Array().shipToCountries.list;

    if (!this.isShoppingCartEmpty && this._commerceUtils.getCartCookieCount() != cartCount) {
      if (cartData && cartData.guid) {
        let guid = cartData.guid + '||' + cartCount;
        this._logger.info("guid = " + guid);
        this._commerceUtils.setCartCookie(guid, '', '');
        $(".counter").addClass('showCart');
        $("#samples-cart-count, .hamburger-samples-cart-count").text(cartCount);
      }
    }
    if (this.isShoppingCartEmpty) {
      // Timeout is required, bcoz, for just one scenario - 'remove last item from cart',
      // this code has to wait until remove item from cart finishes
      setTimeout(() => {
        $(".counter").addClass('showCart');
        $("#samples-cart-count, .hamburger-samples-cart-count").text(0);
        // since shop promo parsys is present below the template file, we are moving it in between the tpl content,
        $('#shop-promo').append(this.samplesCountry ? $('#samplesPromoSection') : $('#promoSection'));
        this.cartLoading = false;
      }, 200);
    }
    else {
      this.isShipToCountryCommerce = this._commonUtils.getCountry(this._teService.getTeV2Array().shipToCountries.list, cartData.deliveryCountry.isocode);
      let siteCountry = this._commerceUtils.getTwoCharacterCountryCode('');
      let currentCountryObj = this._commonUtils.getCountry(this.shipCountryList, cartData.deliveryCountry.isocode);
      if (!currentCountryObj) {
        this._cartService.setShoppingCountry(siteCountry).subscribe((res: any) => {
          that.onSetCountrySuccess
        }, (error) => { that.onSetCountryError })
      } else {
        this.cartTotalTax = cartData.totalTax;
        let tbdLabel = this._teService.getTeV2Array().localization.formLabels.taxTBD;
        let paidByTeLabel = this._teService.getTeV2Array().localization.formLabels.tesogTaxesDesc;
        let taxValue = cartData.totalTax.value || '';
        let isTaxVatExempt = (cartData.totalTax !== undefined) ? Math.floor(cartData.totalTax.value) == -6 : null;
        let paidByTe = (cartData.totalTax !== undefined) ? Math.floor(cartData.totalTax.value) == -5 : null;
        this.deliveryCountry = cartData.deliveryCountry ? cartData.deliveryCountry.isocode : siteCountry;
        this.cartCountry = this._commonUtils.getCountry(this.shipCountryList, this.deliveryCountry);
        this.mtoShippingRestrictionOnOffToggle = this._teService.getTeV2Array().localization.formLabels.mtoShippingRestrictionOnOffToggle === 'ON';
        this.mtoRestrictionOn = this.mtoShippingRestrictionOnOffToggle && this.deliveryCountry !== "US" && cartData.mtoEntries && cartData.mtoEntries.length > 0;


        this.laddRestrictionOn = cartData.cartLabels.laddExportValidationEnabled && this.deliveryCountry !== "US" && cartData.cartType.laddItem;
        let iso3 = this._commerceUtils.getThreeCharacterCountryCode(this.deliveryCountry);
        /*
        * - If cart is having deu Items and Selected Country is TESOG and Current Store is TEUSA - True (show Modal) 
        * - If cart is having USA Items and Selected Country is TESOG and Current Store is TEUSA - True (show Modal) 
        */
        this.mtoRestrictionOn = !this.isTESOGStore && cartData.cartType.deuItem && this._commerceUtils.isShippingCountryTESOG(iso3) && this._teService.getTeV2Array().commerceSettings.enableShippingRestrictionsTEUSA;
        this.mtoRestrictionOn = (cartData.cartType.dkItem || cartData.cartType.laddItem) && this.deliveryCountry === "US" && this.isTESOGStore && this._teService.getTeV2Array().commerceSettings.enableShippingRestrictionsTESOG;

        let isAnyRestrictionOn = this.mtoRestrictionOn || this.teusaRestrictionOn || this.tesogRestrictionOn || this.laddRestrictionOn;

        this.shippingCost = isAnyRestrictionOn ? tbdLabel : cartData.deliveryCost.formattedValue;
        this.totalPriceWithTax = isAnyRestrictionOn ? tbdLabel : cartData.totalPriceWithTax.formattedValue;
        if (this.isTESOGStore) {
          this.taxValue = taxValue < 0 ? (isTaxVatExempt ? this._teService.getTeV2Array().localization.formLabels.tesogVatExemptLabel : (paidByTe ? paidByTeLabel : tbdLabel)) : cartData.totalTax.formattedValue;
          this.taxLabel = isTaxVatExempt || paidByTe ? this._teService.getTeV2Array().localization.formLabels.tesogVatLabel : this._teService.getTeV2Array().localization.formLabels.tesogEstimatedVatLabel;
        }
        else {
          this.taxValue = taxValue < 0 ? (isTaxVatExempt ? this._teService.getTeV2Array().localization.formLabels.taxExemptLabel : (paidByTe ? paidByTeLabel : tbdLabel)) : cartData.totalTax.formattedValue;
          this.taxLabel = isTaxVatExempt || paidByTe ? this._teService.getTeV2Array().localization.formLabels.tesogTaxesLabel : this._teService.getTeV2Array().localization.formLabels.taxesLabel;
        }

        //To show MTO restriction Modal, LADD restriction Modal and Shipping Policy Restriction on load and on Country Change.
        if (isAnyRestrictionOn) {
          let dataObj: any = [];
          let dkProducts = this._commerceUtils.extractProductsFromEntries(cartData.regularEntries, 'DK');
          let laddProducts = this._commerceUtils.extractProductsFromEntries(cartData.regularEntries, 'LADD');
          let deuItemsObj = this._commerceUtils.extractProductsFromEntries(cartData.regularEntries, 'DEU');

          /**Combine MTO parts with deuItems if teusa restriction is ON on TEUSA store Site                                
            *Combine MTO parts with DIGIKEY items and LADD items if restriction is ON on TESOG store Site 
            If both restrcitions are OFF then only MTO parts should be shared
            */
          dataObj.products = this.tesogRestrictionOn ? dataObj.concat(cartData.mtoEntries, dkProducts, laddProducts) : (this.teusaRestrictionOn ? dataObj.concat(deuItemsObj, cartData.mtoEntries) : cartData.mtoEntries);
          /**Combine Existing added parts with LADD only if it is not added on restriction Policy */
          dataObj.products = this.laddRestrictionOn && !this.tesogRestrictionOn ? dataObj.concat(dataObj.products, laddProducts) : dataObj.products;

          dataObj.country = this.deliveryCountry;
          // this.$broadcast('OPEN_CART_RESTRICTION_MODAL', dataObj);
        }

        $(".shoppingCart-subtotal").removeClass("hidediv");
        this.cartLoading = false;
      }
      //based on the cart property in isSwitchedCart session storage the yellow box is hidden or shown when user has switched from other store
      let shippingCountry = this.cartCountry;
      let cartCountryCode = this._commerceUtils.getThreeCharacterCountryCode(shippingCountry.id);
      this.showBoxMessage = (this._commerceUtils.isShippingCountryTEUSA(cartCountryCode) && this.isTESOGStore) || (this._commerceUtils.isShippingCountryTESOG(cartCountryCode) && !this.isTESOGStore); //this.cartCountry = dropdown country
      if (this.showBoxMessage && !this.sampleOnly) {
        this.messageheader = this._teService.getTeV2Array().localization.formLabels.cartStoreMsgHeader.replace('{1}', shippingCountry.text);
        this.messageContent = this.isTESOGStore ? this._teService.getTeV2Array().localization.formLabels.cartTesogCrossStoreDescription.replace(/\{1\}/g, shippingCountry.text) : this._teService.getTeV2Array().localization.formLabels.cartTeusaCrossStoreDescription.replace(/\{1\}/g, shippingCountry.text);
        this.yellowBoxFootMsg = this.isTESOGStore ? this._teService.getTeV2Array().localization.formLabels.tesogCrossStoreFootMsg : this._teService.getTeV2Array().localization.formLabels.teusaCrossStoreFootMsg;
        let country = cartCountryCode === 'usa' ? cartCountryCode : 'global';
        let countryandlang = this._commerceUtils.getSitePathByCountry(country);
        let siteLang = countryandlang.split('-')[1];
        let isAuthInstance = (this._teService.getTeV2Array().settings.isEditMode === true || this._teService.getTeV2Array().cmsSettings.defaultEnvironment === 'LOCAL');
        if (isAuthInstance) {
          let sitePath = this._commerceUtils.getSitePathByCountryForAuthor(country);
          this.visitSite = sitePath + '/commerce/shop/shopping-cart.html';
        } else {
          this.visitSite = this._commerceUtils.getExternalHost(siteLang) + '/' + countryandlang + '/commerce/shop/shopping-cart.html';
        }
      }
      this.checkForOnlyMtoProducts = cartData.cartType ? !cartData.cartType.sampleOnly && cartData.cartType.mtoItem && !cartData.cartType.deuItem && !cartData.cartType.dkItem && !cartData.cartType.laddItem : false;
    }
    this.shoppingPaymentInformation = this.isTESOGStore ? this._teService.getTeV2Array().localization.formLabels.tesogCartPaymentMsg.replace('{1}', siteCountryList.text) : this._teService.getTeV2Array().localization.formLabels.teusaCartPaymentMsg.replace('{1}', siteCountryList.text);
    this.shoppingPaymentTooltip = this.isTESOGStore ? this._teService.getTeV2Array().localization.formLabels.tesogCartPaymentTooltip : this._teService.getTeV2Array().localization.formLabels.teusaCartPaymentTooltip;

    // if (this._teService.getTeV2Array().cmsSettings.defaultEnvironment !== 'LOCAL' && window._satellite && _satellite.track) {
    //   _satellite.track('shopping-cart-pageview');
    // }
  }

  onSetCountrySuccess() {
    this.loadShoppingCart();
  }

  onSetCountryError() {
    this._logger.info('Data not showing up');
  }

  visitCrossStoreSite() {
    this._logger.info('switch cart link clicked');
    this.cartLoading = true;
    let countryCode = this._commerceUtils.getThreeCharacterCountryCode(this.cartCountry.id);
    this.sectionSwitchError = false;
    this._switchCartService.navigateToNewStore(countryCode, this.visitSite).subscribe((res: any) => {
      this.onSwitchCartSuccess();
    }, (error) => { this.onSwitchCartError })
  }

  onSwitchCartSuccess() {
    this._logger.info('country switched to other store');
  }

  onSwitchCartError() {
    this._logger.info('cart did not transferred');
    this.cartLoading = false;
    this.sectionSwitchError = true;
    $("html,body").animate({
      scrollTop: 0
    }, 100);
  }
}
