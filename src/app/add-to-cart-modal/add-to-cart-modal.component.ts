import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { TeModalService } from '../utils/te-modal.service';
import { TeV2AemService } from '../te-v2-aem.service';
import { ModalService } from '../utils/modal.service';
import { CommonUtils } from '../utils/commonUtils';
declare let $: any;

@Component({
    selector: 'app-add-to-cart-modal',
    templateUrl: './add-to-cart-modal.component.html',
    styleUrls: ['./add-to-cart-modal.component.css']
})
export class AddToCartModalComponent implements OnInit {
    localization = {
        commerceLabels: {
            itemAddedToCart: 'You have added an item to the cart'
        },
        resultsTiles: {

        }
    }

    baseUrl = ''
    tcpnUrl = ''
    isMobile: boolean = false;
    addToCartModalTemplate = `<div class="te-global-contact-modal" id="pdp-productcompatible" >
  <div class="inner-cart-modal">
      <div class="cab-section-add-to-cart">
          <section class="addedToCart-banner">
                      
              <!--Last Added product section -->
              <div data-tn-last-added-product="">
                  <div class="addedToCart-checkout">                     
                      <div class="addedToCart-product-name">
                          <div class="addedToCart-head">
                              <h1>
                                You have added an item to the cart
                              </h1>
                          </div>
                          <div class="latest-part">
                              <div class="part-details">
                                  <div class="product-image">
                                      <div class="imgdiv">
                                      <a href="https://www.te.com/usa-en/product-2108964-1.html">
                                                <img alt="Stamped Antenna,SMD,Wi-Fi,2.4+5GHz-2108964-1" ng-src="/content/dam/te-com/catalog/part/021/089/641/2108964-1-t1.jpg/jcr:content/renditions/product-small.png" loading="lazy" src="/content/dam/te-com/catalog/part/021/089/641/2108964-1-t1.jpg/jcr:content/renditions/product-small.png">
                                            </a>
                                      </div>
                                  </div>
                                  <div class="product-desc">
                                      <ul class="cart-ul-width">
                                        <li><h3><a href="https://www.te.com/usa-en/product-2108964-1.html" class="ng-binding">Stamped Antenna,SMD,Wi-Fi,2.4+5GHz</a></h3></li>
                                        <li class="ng-binding">2108964-1</li>
                                        <li class="ng-binding">TE Internal Number:</li>
                                        <li class="ng-binding">2108964-1</li>
                                        <li class="onlyUsaLabel ng-binding ng-hide" ng-show="enableLaddNonShippedProducts &amp;&amp; fulfilledBy === 'LADDUS'">This item can only be shipped to the United States</li>
                                      </ul>
                                  </div>
                              </div>
                              <div class="price-details">
                                    <span class="ng-binding">Price</span>
                                    <p data-ng-show="priceRange !== undefined" class="ng-binding">$0.43</p>
                                </div>
                             <a href="#" class="mobile volume-pricing-toggle ng-binding">
                                <i class="fa fa-plus fa-sm ng-hide" ng-show="!isVolumePricing" role="presentation"></i> 
                                <i class="fa fa-minus fa-sm" ng-show="isVolumePricing" role="presentation"></i> 
                                Volume Pricing
                             </a>
                             <div class="volume-pricing" data-ng-show="prices.length > 0 &amp;&amp; isVolumePricing">
                                <span class="desktop desktop-pricing ng-binding">Volume Pricing</span>
                                <ul>
                                    <!-- ngRepeat: item in prices | limitTo : priceLength --><li data-ng-repeat="item in prices | limitTo : priceLength" class="ng-scope"><span class="ng-binding">1+</span><span class="ng-binding">$0.42911</span></li><!-- end ngRepeat: item in prices | limitTo : priceLength --><li data-ng-repeat="item in prices | limitTo : priceLength" class="ng-scope"><span class="ng-binding">50+</span><span class="ng-binding">$0.39099</span></li><!-- end ngRepeat: item in prices | limitTo : priceLength --><li data-ng-repeat="item in prices | limitTo : priceLength" class="ng-scope"><span class="ng-binding">100+</span><span class="ng-binding">$0.37992</span></li><!-- end ngRepeat: item in prices | limitTo : priceLength -->
                                </ul>
                                    <div class="desktop">
                                        <div class="show-more" ng-show="prices.length > 3">
                                            <a class="view-more ng-binding" href="" ng-class="priceLength > 3 ? 'remove' : ''" data-ng-click="priceLength = prices.length">
                                                VIEW MORE +
                                            </a> 
                                            <a class="view-less ng-binding" href="" ng-class="priceLength > 3 ? 'show' : ''" data-ng-click="priceLength = 3">
                                                VIEW FEWER -
                                            </a>
                                        </div>
                                    </div>
                             
                            </div>
                          </div>
                          <div class="mto-product-cart ng-hide" data-ng-show="isMadeToOrder">
                                <span class="specialOrderLabel ng-binding" data-ng-bind-html="$root.localization.commerceLabels.specialOrderLabel | htmlSafe"><p><b>Special Order—</b></p></span>
                                <span class="mtoShipWithinDaysLabel ng-binding" data-ng-bind-html=" mtoShipWithinDaysLabel | htmlSafe"><p>Ships within 0 days</p></span>
                                <p class="ncnr dynamic-text-color ng-binding" data-ng-bind-html="$root.localization.commerceLabels.specialOrderNonCancelableMsg | htmlSafe"><p><span class="te-dark-grey-98">This item is noncancelable and nonreturnable</span></p></p>
                                <!-- ngIf: $root.localization.commerceLabels.mtoShippingRestrictionOnOffToggle === 'ON' -->
                          </div>
                          <div class="chemical-warning" ng-if="prop65Warning">
                                  <div class="warning-icon"></div>
                                  <div class="warning-msg">
                                      <span class="warning-txt" data-ng-bind-html="prop65WarningMsg | htmlSafe"></span>
                                  </div>
                              </div>
                         <div class="order-update" data-ng-show="stockMetadata !== undefined">
                              <div class="minimum-order">
                                  <p class="ng-binding">Minimum Order Quantity: 1 Piece</p>
                                  <p class="mobile displayMtoStock">14,585 TE Parts In-Stock</p>
                                  <div class="addQuantity-header">
                                      <span class="ng-binding">QTY:</span>
                                      <input type="text" ng-model="quantityAdded" class="addQuantityPDPheader ng-pristine ng-untouched ng-valid" id="quantityUpdate" data-ng-keyup="$emit('QUANTITY_INPUT_CHANGE')" data-ng-modal="addPDPQuantity">
                                  </div>
                                  <div class="error_label hidediv errMsgAddToCartModal"></div>
                              </div>
                              <div class="parts-in-stock">
                                  <p class="desktop displayMtoStock">14,585 TE Parts In-Stock</p>
                                  <a data-ng-click="$emit('UPDATE_CLICKED')" class="secondary-cta-no-icon ng-binding">Update Quantity </a>
                              </div>                            
                          </div>

                          <div class="atc-tooltip">
                                <p class="summary-line ng-binding">At this time, TE Connectivity ships online orders to countries around the world.
                                <a href="" class="toolTipHolder"><i data-tn-tooltipster-directive="" data-width="306" data-height="none" data-tooltip-content="#tooltip-shipping-rules-content-atc-modal" class="tooltipBtn fa fa-question-circle tooltipstered" role="presentation"></i></a>
                                </p>
                          </div>

                      </div>
                      <div class="addedToCart-btn-groups desktop">
                          <div data-tn-free-shipping-banner="" class="freeShippingBannerWrapper"></div>
                          <div class="price-summary">
                                <h4 class="ng-binding">Cart Summary</h4>
                                <ul>
                                    <li>
                                        <span class="ng-binding">Products for purchase</span>
                                        <span class="ng-binding">$38.89</span>
                                    </li>
                                    <li>
                                        <span class="ng-binding">Shipping to United States</span>
                                        <span class="ng-binding">$0.00</span>
                                    </li>
                                    <!--FE18-14771 : commenting the code as the label may need to be displayed in future
                                    <li>
                                        <span></span>
                                    </li>-->
                                    <li class="total">
                                        <span class="ng-binding">Subtotal</span>
                                        <span class="ng-binding">$38.89</span>
                                    </li>
                                </ul>
                                <p class="summary-line ng-binding">Tax information shown during checkout</p>
                                
                          </div>
                          <div ng-if="!isCartPage" class="added-to-cart-continue-checkout ng-scope">
                                <a href="https://www.te.com/usa-en/commerce/shop/shopping-cart.html" class="add-to-cart-cta checkout-button ng-binding">View Cart</a>
                          </div>
                          <div data-ng-click="closeAddToCart()" class="btnCartContinueShop ng-binding">CONTINUE SHOPPING</div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
      <!--Last Added product section end here-->
      
      <!--Compatible parts section -->
      <div data-tn-cart-compatible-products="" data-compatible-tcpn="">
            <div class="productcompatible" data-ng-show="isCompatibleProductsPresent">
                <div class="wrapper content-well">
                    <div class="comp-heading">
                        <div class="comp-heading-ml">
                            <h1 class="cab-heading-nomargin ng-binding">Compatible Products</h1>
                        </div>
                    </div>
                    <div class="non-ecom-modal-error-msg hide-error-msg">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p data-tn-bind-html-compile="$root.localization.relatedProductsSection.outOfStockErrMessage | htmlSafe"></p>
                    </div>
                    
                    <section class="product-info even">
                        <div class="wrapper no-similar pdp-related-products-override">
                            <div class="wrapper" data-ng-class="{loading:loading}">
                                <div class="cab-section">
                                    <div id="cab-container-noborder">
                                        <div id="cab-scroll-wrapper">
                                            <div id="cab-inside-wrapper">
                                                <ul class="cab-list">
                                                    <!-- ngRepeat: product in cartCompatibleProducts --><li class="cab-product-list ng-scope" ng-repeat="product in cartCompatibleProducts">
                                                        <div class="container">
                                                            <a href="https://www.te.com/usa-en/product-2118712-2.html"></a>
                                                            <div class="imgdiv">
                                                                <a href="https://www.te.com/usa-en/product-2118712-2.html" data-dtm-click="compatible-products" data-tcpn="2118712-2" data-desc="1 PC STD SHIELD, CRS-44.37X44.37X9.75MM" data-marketing-part="2118712-2">
                                                                    <img alt="2118712-2-1 PC STD SHIELD, CRS-44.37X44.37X9.75MM" ng-src="https://www.te.com/content/dam/te-com/catalog/part/021/187/122/2118712-2-t1.jpg/jcr:content/renditions/product-details.png" loading="lazy" src="https://www.te.com/content/dam/te-com/catalog/part/021/187/122/2118712-2-t1.jpg/jcr:content/renditions/product-details.png">
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="cab-desc">
                                                            <div class="cab-inner-desc">
                                                                <div class="cab-marketing-part">
                                                                    <a href="https://www.te.com/usa-en/product-2118712-2.html" class="ng-binding" data-tcpn="2118712-2" data-dtm-click="compatible-products" data-desc="1 PC STD SHIELD, CRS-44.37X44.37X9.75MM" data-marketing-part="2118712-2">
                                                                        <span class="marketingMpn ng-binding">TE Part #:</span>
                                                                        <span class="marketingDescription ng-binding">2118712-2</span></a>
                                                                </div>
                                                                <a href="https://www.te.com/usa-en/product-2118712-2.html" class="cab-name-elipsis truncate ng-binding" data-tcpn="2118712-2" data-dtm-click="compatible-products" data-desc="1 PC STD SHIELD, CRS-44.37X44.37X9.75MM" data-marketing-part="2118712-2" style="overflow-wrap: break-word; white-space: normal;">Board Level Shielding (BLS), One-Piece, Cold Rolled... </a>                                                                
                                                            </div>
                                                            <div class="cab-marketing-price" data-ng-show="product.storeInfo !== null">
                                                                <!-- ngIf: product.storeInfo.minPrice --><p class="price-unit ng-binding ng-scope" data-ng-if="product.storeInfo.minPrice">From<span class="min-price ng-binding">$2.061</span></p><!-- end ngIf: product.storeInfo.minPrice -->
                                                                <p class="inventory-stock ng-binding" ng-class="{'has-no-price' : !product.storeInfo.minPrice}" data-ng-show="product.storeInfo.inStock == 'true'">In-Stock</p>
                                                                <p class="inventory-stock ng-binding ng-hide" ng-class="{'has-no-price' : !product.storeInfo.minPrice}" data-ng-show="product.storeInfo.inStock == 'false'">Non-Stocked</p>
                                                            </div>
                                                            <!-- ngIf: product.storeInfo == null -->
                                                        </div>
                                                        <!-- ngIf: product.storeInfo.inStock == 'true' --><div class="cab-buyNow ng-scope" data-ng-if="product.storeInfo.inStock == 'true'">
                                                            <a href="https://www.te.com/usa-en/product-2118712-2.html" data-tn-add-moq-to-cart="" data-moq="-1" data-tn-add-to-cart-modal="" data-modal-cart="true" data-img-src="/content/dam/te-com/catalog/part/021/187/122/2118712-2-t1.jpg/jcr:content/renditions/product-details.png" data-tcpn="2118712-2" class="btn-block-1 btn-clr-1 buy-now ng-scope ng-binding" data-dtm-click="compatible-products-modal-add" data-comptm="true" data-desc="1 PC STD SHIELD, CRS-44.37X44.37X9.75MM" data-marketing-part="2118712-2">
                                                                <i class="icon icon-cart icon-small" role="presentation"></i>Add To Cart
                                                            </a>
                                                        </div><!-- end ngIf: product.storeInfo.inStock == 'true' -->
                                                        <!-- ngIf: product.storeInfo.inStock == 'false' -->
                                                    </li><!-- end ngRepeat: product in cartCompatibleProducts --><li class="cab-product-list ng-scope" ng-repeat="product in cartCompatibleProducts">
                                                        <div class="container">
                                                            <a href="https://www.te.com/usa-en/product-2118708-4.html"></a>
                                                            <div class="imgdiv">
                                                                <a href="https://www.te.com/usa-en/product-2118708-4.html" data-dtm-click="compatible-products" data-tcpn="2118708-4" data-desc="1 PC STD SHIELD, AL-26.21X26.21X5.08MM" data-marketing-part="2118708-4">
                                                                    <img alt="2118708-4-1 PC STD SHIELD, AL-26.21X26.21X5.08MM" ng-src="https://www.te.com/content/dam/te-com/catalog/part/021/187/084/2118708-4-t1.jpg/jcr:content/renditions/product-details.png" loading="lazy" src="https://www.te.com/content/dam/te-com/catalog/part/021/187/084/2118708-4-t1.jpg/jcr:content/renditions/product-details.png">
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="cab-desc">
                                                            <div class="cab-inner-desc">
                                                                <div class="cab-marketing-part">
                                                                    <a href="https://www.te.com/usa-en/product-2118708-4.html" class="ng-binding" data-tcpn="2118708-4" data-dtm-click="compatible-products" data-desc="1 PC STD SHIELD, AL-26.21X26.21X5.08MM" data-marketing-part="2118708-4">
                                                                        <span class="marketingMpn ng-binding">TE Part #:</span>
                                                                        <span class="marketingDescription ng-binding">2118708-4</span></a>
                                                                </div>
                                                                <a href="https://www.te.com/usa-en/product-2118708-4.html" class="cab-name-elipsis truncate ng-binding" data-tcpn="2118708-4" data-dtm-click="compatible-products" data-desc="1 PC STD SHIELD, AL-26.21X26.21X5.08MM" data-marketing-part="2118708-4" style="overflow-wrap: break-word; white-space: normal;">Board Level Shielding (BLS), One-Piece, Aluminum</a>                                                                
                                                            </div>
                                                            <div class="cab-marketing-price" data-ng-show="product.storeInfo !== null">
                                                                <!-- ngIf: product.storeInfo.minPrice --><p class="price-unit ng-binding ng-scope" data-ng-if="product.storeInfo.minPrice">From<span class="min-price ng-binding">$1.465</span></p><!-- end ngIf: product.storeInfo.minPrice -->
                                                                <p class="inventory-stock ng-binding" ng-class="{'has-no-price' : !product.storeInfo.minPrice}" data-ng-show="product.storeInfo.inStock == 'true'">In-Stock</p>
                                                                <p class="inventory-stock ng-binding ng-hide" ng-class="{'has-no-price' : !product.storeInfo.minPrice}" data-ng-show="product.storeInfo.inStock == 'false'">Non-Stocked</p>
                                                            </div>
                                                            <!-- ngIf: product.storeInfo == null -->
                                                        </div>
                                                        <!-- ngIf: product.storeInfo.inStock == 'true' --><div class="cab-buyNow ng-scope" data-ng-if="product.storeInfo.inStock == 'true'">
                                                            <a href="https://www.te.com/usa-en/product-2118708-4.html" data-tn-add-moq-to-cart="" data-moq="-1" data-tn-add-to-cart-modal="" data-modal-cart="true" data-img-src="/content/dam/te-com/catalog/part/021/187/084/2118708-4-t1.jpg/jcr:content/renditions/product-details.png" data-tcpn="2118708-4" class="btn-block-1 btn-clr-1 buy-now ng-scope ng-binding" data-dtm-click="compatible-products-modal-add" data-comptm="true" data-desc="1 PC STD SHIELD, AL-26.21X26.21X5.08MM" data-marketing-part="2118708-4">
                                                                <i class="icon icon-cart icon-small" role="presentation"></i>Add To Cart
                                                            </a>
                                                        </div><!-- end ngIf: product.storeInfo.inStock == 'true' -->
                                                        <!-- ngIf: product.storeInfo.inStock == 'false' -->
                                                    </li><!-- end ngRepeat: product in cartCompatibleProducts -->
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                </div>
            </div>
        </div>
      
      <!--Compatible parts section -->
      <!-- Customer Also bought section, enable only when compatible parts are not present -->
      
      <!--<div data-tn-customers-also-bought="">
            <div data-ng-show="isAlsoBoughtPresent" class="productcompatible ng-hide" ng-class="(customerAlsoBoughtProducts.length > 1  &amp;&amp; $index !== 0) ? 'related-more-than-one': ''">
                <div class="wrapper content-well customer-also-bought">
                    <div class="comp-heading-ml">
                        <h1 class="cab-heading-nomargin ng-binding">Customers Also Bought</h1>
                    </div>            
                    <div class="non-ecom-modal-error-msg hide-error-msg">
                        <i class="fas fa-exclamation-triangle"></i>
                        <!-- <p data-tn-bind-html-compile="$root.localization.customerAlsoBoughtModal.alsoBoughtErrorMessage | htmlSafe"></p> -->
                        <p data-tn-bind-html-compile="$root.localization.relatedProductsSection.outOfStockErrMessage | htmlSafe"></p>
                    </div>
                    <div ng-class="(customerAlsoBoughtProducts.length < 5) ? 'related-less-than-five' : 'related-more-than-four'" class="related-more-than-four">
                        <div id="cab-container-noborder">
                            <div id="cab-scroll-wrapper">
                                <div id="cab-inside-wrapper">
                                    <ul class="cab-list">
                                        <!-- ngRepeat: product in customerAlsoBoughtProducts -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

      
      <!-- Customer Also bought section -->


      <!--Mobile Summary section -->
      <div class="mobile-summary">
            <div class="addedToCart-btn-groups mobile">                
                <div class="price-summary">
                    <h4 class="ng-binding">Cart Summary</h4>
                    <div data-tn-free-shipping-banner="" class="freeShippingBannerWrapper"><!-- ngIf: enableFreeShippingBanner --><div ng-if="enableFreeShippingBanner" class="freeShippingBanner ng-scope">
    <!-- ngIf: showIcon -->
    <div class="fsbContent noLefttMar" ng-class="showIcon?'':'noLefttMar'">
        <small data-tn-bind-html-compile="$root.localization.freeShippingBanner.title | htmlSafe" class="fsbTitle te-orange"><p class="ng-scope">Free Shipping</p>
</small>
        <small data-tn-bind-html-compile="$root.localization.freeShippingBanner.desc | htmlSafe"><p class="ng-scope"><b>available on most items.</b></p>
</small>
    </div>
</div><!-- end ngIf: enableFreeShippingBanner --></div>
                    <ul>
                        <li>
                            <span class="ng-binding">Products for purchase</span>
                            <span class="ng-binding">$38.89</span>
                        </li>
                        <li>
                            <span class="ng-binding">Shipping to the United States</span>
                            <span class="ng-binding">$0.00</span>
                        </li>
                        <!--FE18-14771 : commenting the code as the label may need to be displayed in future
                        <li>
                            <span class="ship-country-msg">{{$root.localization.commerceLabels.cartShippingToOtherCountriesIncheckout}}</span>
                            <span></span>
                        </li>-->            
                    </ul>            
                </div>
                <div class="scroll-area">
                    <div class="scroll"><span class="scroll-bar"></span></div>
                    <div class="scroll-div">
                        <div class="total">
                            <span class="ng-binding">Subtotal</span>
                            <span class="total-price ng-binding">$38.89</span>
                        </div>
                        <p class="summary-line ng-binding">Tax information shown during checkout</p>
                        <!-- ngIf: !isCartPage --><div ng-if="!isCartPage" class="added-to-cart-continue-checkout ng-scope">
                            <a href="https://www.te.com/usa-en/commerce/shop/shopping-cart.html" class="add-to-cart-cta checkout-button ng-binding">View Cart</a>
                        </div><!-- end ngIf: !isCartPage -->
                        <!-- ngIf: isCartPage -->
                        <div data-ng-click="closeAddToCart()" class="btnCartContinueShop ng-binding">CONTINUE SHOPPING</div>
                    </div>
                </div>
            </div>
        </div>
      <!--Mobile Summary section -->
  </div>
  <div class="toopltip-content">
  <div id="tooltip-shipping-rules-content-atc-modal">
      <div class="tooltip-inner-content">
          <p class="ng-binding">TE Connectivity ships items to the following countries:</p>
          <ul class="cab-list">
              <!-- ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Austria</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Belgium</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Canada</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Czech Republic</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Denmark</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Finland</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">France</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Germany</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Hungary</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">India</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Ireland</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Italy</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Luxembourg</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Mexico</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Netherlands</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Norway</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Poland</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Portugal</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Romania</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Spain</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Sweden</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Switzerland</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">Turkey</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">United Kingdom</li><!-- end ngRepeat: ship in shipToCountriesList --><li ng-repeat="ship in shipToCountriesList" class="ng-binding ng-scope">United States</li><!-- end ngRepeat: ship in shipToCountriesList -->
          </ul>
      </div>
  </div>
</div>
</div>
`;

    constructor(private _logger: LoggerService, private _teModalService: TeModalService,
        private _teService: TeV2AemService, private _modalService: ModalService, private _commonUtils: CommonUtils) { }

    ngOnInit(): void {
    }

    closeAddToCartModal() {
        this._logger.info('CLOSE_ATC_MODAL Listened');
        this._teModalService.close();
    }

    initiateAddToCartModal(e: any) {
        e.preventDefault();
        this._logger.info('add to cart modal initiated... ');
        // var closeModal = $.element.attr('data-comptm') === 'true' ? true : false;
        // if (closeModal) {
        //   this._teService.getTeV2Array().ns('digitalData').addCompatibleFromModal = true;
        this._teModalService.close();
        // }
        // double timeout is added to allow some time for modal and its dependencies to load
        // first timeout is for modal
        // second timeout is to set modal height
        setTimeout(() => {
            this.createModal();
            setTimeout(() => {
                var winHeight = window.innerHeight;
                if (winHeight < 700 && !this.isMobile) {
                    var currHeight = winHeight - 140;
                    if (currHeight < $('.inner-cart-modal').height()) {
                        $('.te-global-contact-modal').height(currHeight);
                    } else {
                        $('.te-global-contact-modal').height('auto');
                        var diff = winHeight - $('.te-global-contact-modal').height();
                        $('.te-global-contact-modal').closest("#modal-body").css('top', (diff / 2 - 30));
                    }
                }
                if (winHeight > 700 && !this.isMobile) {
                    var currHeight1 = winHeight - 240;
                    if (currHeight1 < $('.inner-cart-modal').height()) {
                        $('.te-global-contact-modal').height(currHeight1);
                        var diff1 = winHeight - $('.te-global-contact-modal').height();
                        $('.te-global-contact-modal').closest("#modal-body").css('top', (diff1 / 2));
                    } else {
                        $('.te-global-contact-modal').height('auto');
                    }
                }
            }, 3000);
        }, 1500);// FE18-3773 defect. IE requires a slightly higher timeout
    }

    createModal() {
        var modalOptions = {
            size: this._modalService.SIZES.FULL_20
        };

        this._modalService.create(this.addToCartModalTemplate, modalOptions);
        setTimeout(() => {
            if (!$('.non-ecom-modal-error-msg').hasClass('hide-error-msg')) {
                $('.non-ecom-modal-error-msg').addClass('hide-error-msg');
            }
            // if($scope.$root){
            //     $scope.$root.isglobalLoading = false;
            // }else{
            //     $('.glLoading').removeClass('loading');
            // }
            $('.inner-cart-modal').removeClass('ng-cloak');
            let that = this;
            if (this.isMobile) {
                setTimeout(() => {
                    $('.scroll-area').addClass('sticky');
                    $('.scroll-area .scroll').show();
                    $('.sticky .summary-line').hide();
                }, 500);
                $('#modal-content').on('scroll touchmove', function (e: any) {
                    var elem = $(e.currentTarget);
                    that._logger.info(' Scroll Height = ' + elem[0].scrollHeight + ' Scroll Top = ' + elem.scrollTop() + ' Outer Height = ' + elem.outerHeight());
                    that._logger.info(' Matches = ', elem[0].scrollHeight - elem.scrollTop() - 6, elem.outerHeight());
                    if (elem[0].scrollHeight - elem.scrollTop() - 6 < elem.outerHeight()) {
                        that._logger.info('Reached at the bottom .....');
                        $('.scroll-area').removeClass('sticky');
                        $('.scroll-area .scroll').hide();
                        $('.scroll-area .summary-line').show();
                        if (!$('.scroll-div').is(':visible')) {
                            $('.scroll-div').show();
                        }
                        if (that._commonUtils.isSafari()) {
                            $('.te-global-contact-modal').addClass("bottom-space-for-iphone");
                        }
                    } else {
                        that._logger.info('Srolling up .....');
                        $('.scroll-area').addClass('sticky');
                        $('.scroll-area .scroll').show();
                        $('.sticky .summary-line').hide();
                    }
                });
                $('.scroll').on('click', function (e: any) {
                    that._logger.info('Grey line clicked');
                    if ($(e.target).hasClass('scroll-bar')) {
                        that._logger.info('Grey line active...');
                        if ($('.sticky .scroll-div').is(':visible')) {
                            that._logger.info('Floating CTA closed');
                            $('.addedToCart-btn-groups').addClass('scroll-bar-btn');
                            $('.sticky .scroll-div').hide();
                            //$('.mobile-summary .addedToCart-btn-groups').height('30px');
                        } else {
                            that._logger.info('Floating CTA opened');
                            $('.sticky .scroll-div').show();
                            $('.addedToCart-btn-groups').removeClass('scroll-bar-btn');
                            //$('.mobile-summary .addedToCart-btn-groups').height('120px');
                        }
                    }
                });

            }
        });
    }
}
