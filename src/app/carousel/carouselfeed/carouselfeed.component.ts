import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/logger.service';
import { ProductDataUtilService } from 'src/app/product-data-util.service';
import { TnMerchandisingCarouselDataService } from 'src/app/services/tn-merchandising-carousel-data.service';
import { CommerceUtils } from 'src/app/utils/commerceUtils';
import { ScreenService } from 'src/app/utils/screen.service';
import { SettingsHelperService } from 'src/app/utils/setting-helper.service';
import { TruncationService } from 'src/app/utils/truncation.service';
import { environment } from 'src/environments/environment';
import { TeV2AemService } from '../../te-v2-aem.service';

declare let $: any;


@Component({
  selector: 'app-carouselfeed',
  templateUrl: './carouselfeed.component.html',
  styleUrls: ['./carouselfeed.component.less']
})
export class CarouselfeedComponent implements OnInit {

  isLoading: boolean;
  country = '';
  inStockLabel: any;
  teV2: any = {
    'localization': {
      'merchandisingCarousel': {
        viewProductsLabel: 'View Products',
        inStockLabel: 'In-Stock',
        outOfStockLabel: 'Non-Stocked',
        specialOrderLabel: '<p>Special Order</p>',
        fromLabel: 'From'
      }
    }
  }
    ;
  title = 'Carousel';
  productsData: any[] = [{ 'parentCategory': 'antenna', 'productUrl': 'product1url', 'partType': 'model', 'marketingPartNumId': '1' }];
  mdpParameters = '';
  feedUrl = '/teccatv2/service/product/most-viewed-products';
  inStockOnly = 'true';
  facetSelected = '';
  heading = '';
  host = environment.host;

  constructor(
    private _teService: TeV2AemService,
    private settingsHelper: SettingsHelperService,
    public commerceUtils: CommerceUtils,
    private merchandisingCarouselDataService: TnMerchandisingCarouselDataService,
    private logger: LoggerService,
    private productDataUtil: ProductDataUtilService,
    private screen: ScreenService,
    private truncation: TruncationService) 
  {
    this.isLoading = true;
    this.country = '';
  }

  ngOnInit(): void {
    this.settingsHelper.envHost('');
    // this.teV2 = this._teService.getTeV2Array();
    this.inStockLabel = this.teV2.localization.merchandisingCarousel.inStockLabel;

    this.retrieveFeedbasedProducts();
  }


  async retrieveFeedbasedProducts() {
    try {
      const response = await this.merchandisingCarouselDataService.retreiveFeedProducts(this.feedUrl, this.inStockOnly, this.facetSelected);
      this.feedProductsDataLoadSuccess(response.results);
    } catch (e) {
      this.resultLoadError();
      console.log(e);
    }
  }


  feedProductsDataLoadSuccess(data: any) {
    this.logger.info("Feed based carousel - Success...... ");

    this.productsData = [];

    (window as any).merchImpressionsData = (window as any).merchImpressionsData || [];
    (window as any).merchImpressionsData.push(data.products);

    if (data.products && data.products.length === 0) {
      this.heading = this._teService.settings.isEditMode === true ? "Merchandising Carousel Did Not Return Products" : "";
    }

    this.title = this.heading;
    var tcpns = '';

    for (var i = 0, len = data.products.length; i < len; i++) {
      data.products[i].currencyIso = data.currency;
      this.productsData.push(this.productDataUtil.formatProduct(data.products[i]));
      tcpns = tcpns + data.products[i].tcpn + (i < len - 1 ? "|" : '');
    }

    // Ability to carry the discrete number of products from carousel to MDP
    this.mdpParameters = this.inStockOnly !== '' ? '?instock=store' : '';

    setTimeout(() => {

      this.buildCarousel();
      this.isLoading = false;
      $('.merchandising-carousel-container.feed .wrapper').removeClass('loading');
    });

    // if(this._teService.cmsSettings.defaultEnvironment !== 'LOCAL' && _satellite && _satellite.track) {
    //     _satellite.track('merchandising-carousel-feed');
    // }
  }

  resultLoadError() { }

  buildCarousel() {
    var merchandisingModuleEle = $(".fp-cab-list-wrapper", Element);
    var slickObj = {
            dots: false,
            arrows: true,
            centerMode: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span style="font-size: 30px; display: flex; align-items: center; padding: 8px" class="cab-navigation cab-prev"><i class="fas fa-angle-left"></i></span>',
            nextArrow: '<span style="font-size: 30px; display: flex; align-items: center; padding: 8px" class="cab-navigation cab-next"><i class="fas fa-angle-right"></i></span>'
        };
    if(merchandisingModuleEle.closest(".campaign-landing-eloqua-content-wrapper").length > 0){
        $.extend(slickObj, {
            slidesToShow: 3,
            responsive: [{
                breakpoint: 719,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1439,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
    }
    else if(this.screen.getState().isResponsivePage && this.screen.getState().isWideScreenSupportedPage){
        $.extend(slickObj, {
            slidesToShow: 5,
            responsive: [{
                breakpoint: 719,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1439,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }]
        });
    }
    else if(this.screen.getState().isResponsivePage){
        $.extend(slickObj, {
            responsive: [{
                breakpoint: 719,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }
    (merchandisingModuleEle as any).slick(slickObj);
    this.truncation.init();

   }
}
