import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TeV2ArrayWindowObj } from './models/interfaces/teV2.interface';


@Injectable({
  providedIn: 'root'
})
export class TeV2AemService {

  urls = {
    "suggestionsSearch": "/teccatv2/service/search/suggestions",
    "categorySuggestionsSearch": "/teccatv2/service/feature/child-features",
    "searchUrls": {
      "search": "/teccatv2/service/search/products",
      "searchGroup": "/teccatv2/service/search/web"
    },
    "complianceUrl": "/commerce/alt/SinglePartSearch.do?dest=res&PN=<tcpn>",
    "noProductImage": "/content/dam/te-com/no-image-available.jpg",
    "defaultDownloadImage": "/content/dam/te-com/default-download.jpg",
    "productJsonServiceUrl": "/teccatv2/service/product",
    "samples": {
      "productAddSampleCartUrl": "/commerce/sam/addPartToCart.do",
      "productHasSampleRequestUrl": "/commerce/sam/checkAvailability.do",
      "samplesFaqUrl": "/usa-en/utilities/te-digital-resources/how-to-order-samples/list-of-eligible-countries.html"
    },
    "apiServicesHost": "https://api.te.com",
    "teccatv2Externalhost": "https://www.te.com",
    "similarPartsPLPMuleServiceUrl": "/api/v1/recommendations/products/{0}/similar_products",
    "httpsExternalhost": "https://www.te.com",
    "partsList": {
      "getPartListNames": "/commerce/mpl/getPartListNames.do",
      "addPart": "/commerce/mpl/addPart.do",
      "managePartsList": "/commerce/mpl/managePartLists.do"
    }
  };
  settings = {
    "optimizeAssets": true,
    "plDevMode": false,
    "plLogLevel": "ERROR",
    "plAEMSourceOverride": false,
    "plEpdHost": "https://www.te.com",
    "eloquaFormActionUrl": "https://s2070786569.t.eloqua.com/e/f2",
    "enableDivestiture": true,
    "enableCpdDivestiture": true,
    "muleSignUpHost": "https://api.te.com/portal/login/",
    "logLevel": "ERROR",
    "createTECewtCookies": true,
    "country": "usa",
    "lang": "en",
    "sitePath": "/content/te-com/usa/en",
    "isEditMode": false,
    "isDesignMode": false,
    "isPreviewMode": false,
    "isWCMDisabled": true,
    "distributorRegion": "North America"
  };

  store = {
    "storeId": "TEUSA",
    "storeType": "M",
    "country": "usa",
    "isStoreResolved": true,
    "isSoftLaunch": false,
    "countryStoreMap": {
      "bih": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "hun": {
        "storeType": "M",
        "store": "TESOG"
      },
      "swe": {
        "storeType": "M",
        "store": "TESOG"
      },
      "col": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "usa": {
        "storeType": "M",
        "store": "TEUSA"
      },
      "esp": {
        "storeType": "M",
        "store": "TESOG"
      },
      "bel": {
        "storeType": "M",
        "store": "TESOG"
      },
      "isr": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "fin": {
        "storeType": "M",
        "store": "TESOG"
      },
      "tun": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "lux": {
        "storeType": "M",
        "store": "TESOG"
      },
      "kor": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "bra": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "tur": {
        "storeType": "M",
        "store": "TEUSA"
      },
      "rus": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "fra": {
        "storeType": "M",
        "store": "TESOG"
      },
      "deu": {
        "storeType": "M",
        "store": "TESOG"
      },
      "egy": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "ita": {
        "storeType": "M",
        "store": "TESOG"
      },
      "pak": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "sgp": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "ukr": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "zaf": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "dnk": {
        "storeType": "M",
        "store": "TESOG"
      },
      "che": {
        "storeType": "M",
        "store": "TESOG"
      },
      "nzl": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "chn": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "hrv": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "idn": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "prt": {
        "storeType": "M",
        "store": "TESOG"
      },
      "vnm": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "cyp": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "aus": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "aut": {
        "storeType": "M",
        "store": "TESOG"
      },
      "lka": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "hkg": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "mys": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "twn": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "bgr": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "pol": {
        "storeType": "M",
        "store": "TESOG"
      },
      "cze": {
        "storeType": "M",
        "store": "TESOG"
      },
      "nor": {
        "storeType": "M",
        "store": "TESOG"
      },
      "can": {
        "storeType": "M",
        "store": "TEUSA"
      },
      "are": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "arg": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "grc": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "rou": {
        "storeType": "M",
        "store": "TESOG"
      },
      "ind": {
        "storeType": "M",
        "store": "TEUSA"
      },
      "mar": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "mex": {
        "storeType": "M",
        "store": "TEUSA"
      },
      "irl": {
        "storeType": "M",
        "store": "TESOG"
      },
      "srb": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "sau": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "nld": {
        "storeType": "M",
        "store": "TESOG"
      },
      "blr": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "jpn": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "svk": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "svn": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "ltu": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "tha": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "phl": {
        "storeType": "S",
        "store": "TEUSA"
      },
      "gbr": {
        "storeType": "M",
        "store": "TEUSA"
      }
    },
    "sflaunchMap": null
  }

  cmsSettings = {
    "defaultLanguage": "en",
    "defaultCountry": "usa",
    "defaultEnvironment": "PROD"
  }

  localization: any = {
    "results": "Results",
    "searchTitleLabel": "Search",
    "resultsFor": "for",
    "recentSearchTitle": "Recent Searches",
    "clearRecentSearchHistory": "Clear Search History",
    "searchSuggestionCategoryLabel": "Categories",
    "searchProductSuggestionsLabel": "Product Suggestions",
    "searchSuggestionProductFamilyLabel": "Product Family",
    "searchSuggestionsSeriesLabel": "Series",
    "searchIndustriesSolutionsLabel": "Industries & Solutions",
    "teInternalHash": "TE Internal #:",
    "weAreHereToHelp": "We are here to help!",
    "weAreHereToHelpDesc": "Get in touch with our product experts.",
    "pdpEmailUs": "Email us",
    "searchResults": {
        "searchResultsTitle": "Search Results",
        "showLabel": "Show",
        "searchLabel": "Search",
        "searchWithinResults": "Search within results",
        "unitLabel": "Units",
        "productTab": "Products",
        "mdpGridProducts": "Products",
        "informationTab": "Information",
        "resultLabel": "Result",
        "resultsLabel": "Results",
        "remainingLabel": "Remaining",
        "applyFiltersLabel": "Apply Filters",
        "resultsByCategory": "Results by Category",
        "resultsView": "View",
        "resultsCategory": "Categories",
        "resultsProduct": "Products",
        "refineResultsLabel": "Filters",
        "filtersLabel": "Filters",
        "samplesAvailable": "Samples Available",
        "refinementsLabel": "Selected Filters",
        "categoriesLabel": "Categories",
        "clearAll": "Clear All",
        "noSamplesAvailable": "No samples are available for these products",
        "DeselecteAttirbutes": "Deselect some of the chosen attributes to find similar items",
        "oplpResultLabel": "Ready-To-Order Part",
        "oplpResultsLabel": "Ready-To-Order Parts",
        "forText": "for",
        "moreOptions": "More Options",
        "lessOptions": "Less Options",
        "noResultsTitle": "",
        "plpNoResultsTitle": "No Results",
        "yourSearch": "Your query does not match any items.",
        "yourSearch1": "Your query",
        "yourSearch2": "does not match any",
        "yourSearchItems": "items",
        "yourSearchProducts": "products",
        "productNoResult1": "No products matched your selection. Use fewer filters to expand the results.",
        "productNoResult2": "Remove one more selected filters to find products",
        "didNotMatchDocuments": "– did not match any documents on TE.com.",
        "didNotMatchProducts": "– did not match any products on TE.com.",
        "searchSuggestionsTitle": "Search Again",
        "contactUsLabel1": "If you do not see your required configuration,",
        "contactUsLabel2": "for additional configurations options.",
        "contactUsLink": "Contact Us",
        "searchSuggestion": "<p>Make sure all words are spelled correctly. Try different keywords. Try more general keywords.</p>\n",
        "metricLabel": "Metric",
        "englishLabel": "English",
        "didYouMeanLabel": "Did you mean:",
        "matchesCompetitors": "Your search matches 1 or more competitors.",
        "viewCompetitorsPartMatches": "View the competitor part matches.",
        "didYouMeanLabelSRP": "Did you mean:",
        "pdpDocumentChangeApply": "Apply",
        "pdpDocumentChangeClear": "Clear Selections",
        "compareProductsButton": "Compare",
        "compareProductsOverlayHeader": "Selection Exceeds Limit.",
        "compareProductsOverlayDesc": "Compare ten or fewer products.",
        "productCompareLink": "/usa-en/plp/products-compare.html",
        "seeAllSimilarCompatibleLabel": "See All",
        "ensureAccuracy": "Ensure accuracy:",
        "ensureAccuracyDesc": "Verify the spelling of your search terms",
        "expandYourSearch": "Expand your search:",
        "expandYourSearchDesc": "Choose other terms - specifically or broadly - related to your topic",
        "useOtherTools": "Expand Your Search - Use Other Tools",
        "documentsAndDrawings": "Documents and Drawings",
        "productCompliance": "Product Compliance",
        "applicationTooling": "Application Tooling",
        "productCrossReference": "Product Cross Reference",
        "documentsAndDrawingsUrl": "https://www.te.com/commerce/DocumentDelivery/DDEController",
        "productComplianceUrl": "https://www.te.com/commerce/alt/product-compliance.do",
        "applicationToolingUrl": "https://www.te.com/usa-en/products/application-tooling/intersection/tooling-search.html?tab=pgp-story",
        "productCrossReferenceUrl": "https://www.te.com/commerce/pcr/",
        "mdpcontactusurl": "/usa-en/customer-support/model-contact-us",
        "contactUsUrl": "/usa-en/customer-support/email-us",
        "rangeFilterMinLabel": "Minimum (≥)",
        "rangeFilterMaxLabel": "Maximum (≤)",
        "overviewTabLabel": "Overview",
        "relatedMaterialsTabLabel": "Related Materials",
        "pgpPath": "",
        "overviewTabExists": "",
        "relatedMaterialsTabExists": "",
        "viewProductLabel": "View Product",
        "viewProductsLabel": "View Products",
        "mdpProductDetails": "Product Details",
        "mdpTEpartText": "TE Part #",
        "mdpDocumentsText": "Documents",
        "inventoryAvailableLabel": "Available for Purchase",
        "showingLabel": "Showing",
        "pageLabel": "Page",
        "ofLabel": "of"
    },
    "optionalRegister": {
        "createLabel": "Create an account with us",
        "downloadLabel": "to download documents, order samples, save product lists, and get updates.",
        "orLabel": "Or,",
        "guestLabel": "continue as a guest",
        "alreadyLabel": "Already have an account? Enter your email so we can confirm",
        "enterEmailLabel": "Enter your Email",
        "thankYou": "Thank you!",
        "thankYouText": "Your requested document is downloading",
        "emailErrorMessage": "Invalid email id, please provide a correct email"
    },
    "commerceLabels": {
        "distributorName": "Distributor",
        "availability": "AVAILABILITY",
        "unitPrice": "Unit price",
        "quantity": "QUANTITY",
        "totalPrice": "Total",
        "unitType": "Unit type",
        "units": "Units",
        "increments": "Increments",
        "addToCart": "Add To Cart",
        "itemAddedToCart": "You have added an item to the cart",
        "viewMore": "VIEW MORE +",
        "viewLess": "VIEW FEWER -",
        "errorNonNumericalQuantity": "Enter a number.",
        "errorQuantityLessMinorder": "Enter value greater than or equal to {}.",
        "errorNotAvailablestock": "Order up to {} from TE.",
        "errorQuantityIncrements": "Enter the quantity in increments of {}.",
        "buyNow": "Add to Cart",
        "teDistributorUrl": "/usa-en/utilities/te-digital-resources/how-to-order-samples/list-of-eligible-countries.html",
        "qty": "Quantity",
        "price": "Unit Price",
        "update": "Update",
        "remove": "Remove Item",
        "outofstockmsg": "You already have all items in stock added to your cart.",
        "quantityminordermsg": "Due to limited inventory, not all of the quantity you requested was added to your cart.",
        "genericcartmsg": "Unfortunately your request to add this product to your cart cannot be completed at this time.",
        "shopTE": "Shop TE",
        "pdpSubTotalLabel": "Extended Price",
        "cartQty": "QTY",
        "subTotal": "SUBTOTAL",
        "itemLabel": "Item",
        "itemsLabel": "items",
        "continueShopping": "CONTINUE SHOPPING",
        "checkoutLabel": "CHECKOUT",
        "teVolumePricing": "Volume Pricing",
        "priceWithCurrency": "Unit Price",
        "moqlabel": "Minimum Order Quantity",
        "partsLabel": "TE Parts",
        "addToCartSummary": "Cart Summary",
        "shippingRulesHeading": "",
        "shippingRulesContent": "At this time, TE Connectivity ships online orders to countries around the world.",
        "shippingRulesTooltipHead": "TE Connectivity ships items to the following countries:",
        "shippingRulesTooltipCountries": "",
        "incotermsHeading": "",
        "incotermsContent": "All sales taxes, customs, and duties will be paid by TE when legally allowed. Generally, no additional payment is due upon delivery.",
        "vatMessageHeading": "VAT INFORMATION",
        "vatMessageContent": "Tax & VAT information shown during checkout.",
        "productsForSummary": "Products for purchase",
        "shipping": "Shipping",
        "estimatedTotal": "Subtotal",
        "taxesCaluculatedCheckout": "Tax information shown during checkout",
        "cartShippingToUnitedstates": "Shipping to the United States",
        "shippingToCountryLabel": "Shipping to",
        "cartShippingToOtherCountriesIncheckout": "",
        "cartShippingRateToUsa": "Shipping rate may change based on destination.",
        "cartShipppedToUSAOnly": "This item can only be shipped to the United States",
        "shippingRuleContentMsg": "At this time, TE Connectivity ships online orders to countries around the world.",
        "tesogShippingRuleContentMsg": "At this time, TE Connectivity ships online orders to countries around the world.",
        "shippingRuleTooltipHead": "TE Connectivity ships items to the following countries:",
        "shipInternationallyRuleLabel": "",
        "shippedToUsaOnlyLabel": "This item can only be shipped to the United States",
        "additionalChargesLabel": "",
        "additionalChargesDesc": "All sales taxes, customs, and duties will be paid by TE when legally allowed. Generally, no additional payment is due upon delivery.",
        "shippingCarrierConfirmation": "",
        "specialOrderShippingMsg": "<p>Ships within {1} days</p>\n",
        "specialOrderLabel": "<p><b>Special Order—</b></p>\n",
        "specialOrderNonCancelableMsg": "<p><span class=\"te-dark-grey-98\">This item is noncancelable and nonreturnable</span></p>\n",
        "mtoShippingRestrictionOnOffToggle": "",
        "tbdLabel": "TBD",
        "warningCancerLabel": "<p>This product can expose you to&nbsp;{1}, which is known to the State of California to cause cancer. For more information go to www.P65Warnings.ca.gov.</p>\n<div style=\"position: absolute; left: -10000px; width: 9000px; top: 0px;\"><table class=\"wrapped relative-table tablesorter tablesorter-default confluenceTable\" style=\"margin: 0px; border-collapse: collapse; width: 638.182px; overflow-x: auto; color: rgb(9, 30, 66); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">\n<tbody style=\"border-bottom: 2px solid rgb(223, 225, 230);\"><tr><td class=\"confluenceTd\" style=\"border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; min-width: 8px;\"><span style=\"color: rgb(0, 0, 0);\">This product can expose you to&nbsp;{1}, which is known to the State of California to cause cancer. For more information go to www.P65Warnings.ca.gov.</span></td>\n</tr></tbody></table>\n</div>\n<div style=\"position: absolute; left: -10000px; width: 9000px; top: 0px;\"><table class=\"wrapped relative-table tablesorter tablesorter-default confluenceTable\" style=\"margin: 0px; border-collapse: collapse; width: 638.182px; overflow-x: auto; color: rgb(9, 30, 66); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">\n<tbody style=\"border-bottom: 2px solid rgb(223, 225, 230);\"><tr><td class=\"confluenceTd\" style=\"border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; min-width: 8px;\"><span style=\"color: rgb(0, 0, 0);\">This product can expose you to&nbsp;{1}, which is known to the State of California to cause cancer. For more information go to www.P65Warnings.ca.gov.</span></td>\n</tr></tbody></table>\n</div>\n<div style=\"position: absolute; left: -10000px; width: 9000px; top: 0px;\"><table class=\"wrapped relative-table tablesorter tablesorter-default confluenceTable\" style=\"margin: 0px; border-collapse: collapse; width: 638.182px; overflow-x: auto; color: rgb(9, 30, 66); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">\n<tbody style=\"border-bottom: 2px solid rgb(223, 225, 230);\"><tr><td class=\"confluenceTd\" style=\"border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; min-width: 8px;\"><span style=\"color: rgb(0, 0, 0);\">This product can expose you to&nbsp;{1}, which is known to the State of California to cause cancer. For more information go to www.P65Warnings.ca.gov.</span></td>\n</tr></tbody></table>\n</div>\n<div style=\"position: absolute; left: -10000px; width: 9000px; top: 0px;\"><table class=\"wrapped relative-table tablesorter tablesorter-default confluenceTable\" style=\"margin: 0px; border-collapse: collapse; width: 638.182px; overflow-x: auto; color: rgb(9, 30, 66); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">\n<tbody style=\"border-bottom: 2px solid rgb(223, 225, 230);\"><tr><td class=\"confluenceTd\" style=\"border: 1px solid rgb(221, 221, 221); padding: 7px 10px; vertical-align: top; min-width: 8px;\"><span style=\"color: rgb(0, 0, 0);\">This product can expose you to&nbsp;{1}, which is known to the State of California to cause cancer. For more information go to www.P65Warnings.ca.gov.</span></td>\n</tr></tbody></table>\n</div>\n",
        "warningDevLabel": "<p>This product can expose you to {1}, which is known to the State of California to cause birth defects or other reproductive harm. For more information go to www.P65Warnings.ca.gov.</p>\n",
        "warningCancerDevLabel": "<p>This product can expose you to chemicals including {1}, which is known to the State of California to cause cancer and birth defects or other reproductive harm. For more information go to www.P65Warnings.ca.gov.</p>\n",
        "warningLabel": "warning",
        "samplesBannerMessage": "",
        "viewCartLabel": "View Cart"
    },
    "commerceUrls": {
        "laddDistributorStockNotAvalble": "/usa-en/campaigns/transportation-solutions/ladd-out-of-stock-form.html?p_prod_desc=Shop+our+TE+Store%2C+Same-Day+Shipping+%7C+TE+Connectivity&p_url=&webprimarygroup=ICT",
        "customerAlsoBought": "/teccatv2/service/usa/en/product/also-bought/"
    },
    "customerAlsoBoughtModal": {
        "title": "Customers Also Bought",
        "mdpTEpartText": "TE Part #",
        "perUnitLabel": "per unit",
        "inventoryLabel": "Inventory"
    },
    "compatiblePartsModal": {
        "compatibleProducts": "Compatible Products",
        "contactUs": "Contact Product Support",
        "viewProduct": "View Product",
        "inStock": "In-Stock",
        "outOfStock": "Non-Stocked",
        "fromlabel": "From",
        "contactSupportLink": "/usa-en/customer-support/email-us"
    },
    "freeShippingBanner": {
        "toggle": "ON",
        "title": "<p>Free Shipping</p>\n",
        "desc": "<p><b>available on most items.</b></p>\n",
        "color": "te-orange",
        "icon": "",
        "weight": ""
    },
    "commerceCodeLabels": {
        "TEUS-url": "",
        "TEUS": "TE Connectivity",
        "shippingMessage_TEUS": "Can ship immediately",
        "US_express": "2 - 3 days",
        "US_expedited": "1 day",
        "US_standard": "5 - 7 days"
    },
    "resultsTiles": {
        "productTileLabel": "Product",
        "productGroupTileLabel": "Product Group",
        "productDrawingsLabel": "Product Drawing",
        "pdpDrawingLabel": "Drawing",
        "getSampleLabel": "Get Free Samples",
        "label3DModel": "3D PDF",
        "similarProductsLabel": "Similar Products",
        "saveToListLabel": "Save to List",
        "shareLabel": "Share",
        "quickViewLabel": "Quick View",
        "viewLessLabel": "View Less",
        "teInternalNumberLabel": "TE Internal Number:",
        "teMatchingPartNumber": "Matching Part #:",
        "teViewMore": "View More",
        "milSpecIdLabel": "Mil-Spec:",
        "aliasIdLabel": "Alias ID:",
        "competitorPartMatch": "Competitor Part Match",
        "competitorPartResultsFound": "Competitor Part Match Results Found for",
        "competitorPartDisclaimer": "Part Match Disclaimer",
        "competitorMatchDisclaimer": "",
        "competitorPartMatchNotes": "Competitive Match Notes",
        "competitorPartTermsAndConditions": "Terms and Conditions",
        "competitorName": "Competitor",
        "competitorPartNumber": "Number",
        "competitorDescription": "Description",
        "commentsVariances": "Comments/Variances",
        "availableInTEStore": "Available in TE Store",
        "buyontecom": "Buy on te.com",
        "viewAllProductOptions": "View all product options",
        "viewAllProductOptionsNonModel": "View all product options",
        "viewAllProductOptionsCount": "60",
        "rohsCompliance": "EU RoHS Directive 2011/65/EU",
        "elvCompliance": "EU ELV Directive 2000/53/EC",
        "productFamilies": "Product Families",
        "seriesLinks": "Series",
        "priceLabel": "Price",
        "readMoreLabel": "Read More",
        "readLessLabel": "Read Less",
        "tePartHash": "TE Part #:",
        "pdpProductLabel": "PRODUCTS",
        "pdpViewLabel": "View",
        "noAccountSelectIndustryLabel": "<p>Select your industry above to see improved recommendations or,&nbsp;<a href=\"https://www.te.com/commerce/esr/int/request_application_access.do\">Request additional access</a> to see recommendations based on your company’s purchases.</p>"
    },
    "requestSamples": {
        "getSampleModalLabel": "Get Free Samples",
        "recommendedAlternativesLabel": "View alternate samples",
        "checkWithDistributionOrYouMay": "Or you may",
        "checkWithDistributionLink": "",
        "checkWithDistributionLabel": "Check Distributor Inventory",
        "checkWithDistributionOfProduct": "of the product.",
        "inStockLabel": "In Stock",
        "inStockDescription": "",
        "outOfStockLabel": "Out of Stock",
        "outOfStockDescription1": "Samples of this product are currently unavailable. You can either contact us or add the product to the cart and it will ship once it's back in stock.",
        "outOfStockDescription2": "",
        "outOfStockDescriptionLink": "",
        "outOfStockDescriptionLinkLabel": "",
        "sampleNotStockedLabel": "Sample Not Stocked",
        "sampleNotStockedDescription1": "Samples of this product are not stocked. You can either",
        "sampleNotStockedDescription2": "or view our available alternate samples.",
        "sampleNotStockedDescriptionLink": "",
        "sampleNotStockedDescriptionLinkLabel": "contact us,",
        "addToCartLabel": "Add to Cart",
        "yourRequestLabel": "Your Request",
        "alternativesLabel": "Alternatives",
        "checkForSampleLabel": "Check for sample",
        "requestUnavailableMessage": "Your requested sample is currently unavailable. The alternatives suggested here may have samples available.",
        "anotherSampleRoomDescription": "Request a sample from one of our product specialists.",
        "orderSampleLabel": "Get Free Sample",
        "sampleErrorMessage": "",
        "estimatedShipDate": "For Estimated Ship Date",
        "addToCartBackordered": "<p>Add to Cart to Backorder</p>",
        "samplesErrorLabel": "We cannot add samples to your cart at this time. Please try again later.",
        "modelCtaNonSampleSite": "<p>SEE WHERE WE SHIP SAMPLES</p>",
        "modelTextNonSampleSite": "<p>Sample items are not available on this country site. To order samples, please see the Samples FAQ's for what country sites offer samples.</p>\n",
        "samplesItemsMessage": "",
        "paidItemsMessage": ""
    },
    "productCompliance": {
        "5": "5 of 6 EU RoHS/ELV Compliant",
        "G": "Converted to EU RoHS but not ELV Compliant",
        "G-desc": "<p>These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) but NOT with the End of Life Vehicles Directive 2000/53/EC (ELV). These products utilize exemptions in the RoHS2 Directive that are not allowed in the ELV Directive. Finished electrical and electronic products will be CE marked as required by Directive 2011/65/EU (RoHS2). Components may not be CE marked. &nbsp;</p>\n",
        "L": "Not EU RoHS or ELV Compliant",
        "L-desc": "<p>These products do NOT comply with the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) and the End of Life Vehicles Directive 2000/53/EC (ELV). This means that these products contain lead or other materials that are restricted in these Directives. Consequently, they should NOT be used in any application requiring RoHS2 or ELV compliance. &nbsp;</p>\n",
        "5-desc": "<p>These products comply with the End of Life Vehicles Directive 2000/53/EC (ELV) but due to lead in the solderable interface do NOT comply with the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). However, these products may be suitable for use in applications where there is a RoHS2 product based exemption for lead in solders, such as the server, storage, or network infrastructure exemption. &nbsp;</p>\n",
        "A": "Converted to ELV Compliant",
        "A-desc": "<p>These products comply with the End of Life Vehicles Directive 2000/53/EC (ELV). The ELV Directive requires that certain automotive products be free (except for trace impurities) of mercury, cadmium and lead. Lead can still be used as an alloying additive in copper, steel and aluminum and in solderable applications.&nbsp;</p>\n",
        "E": "Always ELV Compliant",
        "E-desc": "<p>These products comply with the End of Life Vehicles Directive 2000/53/EC (ELV). The ELV Directive requires that certain automotive products be free (except for trace impurities) of mercury, cadmium and lead. Lead can still be used as an alloying additive in copper, steel and aluminum and in solderable applications. &nbsp;</p>\n",
        "V": "Always EU RoHS compliant but not ELV Compliant",
        "V-desc": "<p>These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) but NOT with the End of Life Vehicles Directive 2000/53/EC (ELV). These products utilize exemptions in the RoHS2 Directive that are not allowed in the ELV Directive. Finished electrical and electronic products will be CE marked as required by Directive 2011/65/EU (RoHS2). Components may not be CE marked. &nbsp;</p>\n",
        "R": "Always EU RoHS/ELV Compliant",
        "R-desc": "<p>These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). These products also comply with the End of Life Vehicles Directive 2000/53/EC (ELV). The RoHS2 Directive requires certain electrical and electronic products be free (except for trace impurities) of mercury, cadmium, hexavalent chromium, PBB, PBDE and lead. Certain exemptions are allowed such as lead used as an alloying additive in copper, steel and aluminum. Finished electrical and electronic products will be CE marked as required by Directive 2011/65/EU (RoHS2). Components may not be CE marked.&nbsp;</p>\n",
        "Y": "Converted to EU RoHS/ELV Compliant",
        "Y-desc": "<p>These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). These products also comply with the End of Life Vehicles Directive 2000/53/EC (ELV). The RoHS2 Directive requires certain electrical and electronic products be free (except for trace impurities) of mercury, cadmium, hexavalent chromium, PBB, PBDE and lead. Certain exemptions are allowed such as lead used as an alloying additive in copper, steel and aluminum. Finished electrical and electronic products will be CE marked as required by Directive 2011/65/EU (RoHS2). Components may not be CE marked. &nbsp;</p>\n",
        "S": "Not in Scope for ELV Compliance",
        "S-desc": "<p>These are products that TE Connectivity (TE) considers to be out of scope for the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) and/or the End of Life Vehicles Directive 2000/53/EC (ELV). These typically would be products that are not electrical or electronic in nature nor would be used in electrical/electronic equipment covered by these Directives. Customers should verify this assessment prior to use. &nbsp;</p>\n",
        "T": "Not in Scope for EU RoHS Compliance",
        "T-desc": "<p>These are products that TE Connectivity (TE) considers to be out of scope for the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) and/or the End of Life Vehicles Directive 2000/53/EC (ELV). These typically would be products that are not electrical or electronic in nature nor would be used in electrical/electronic equipment covered by these Directives. Customers should verify this assessment prior to use.&nbsp;</p>\n",
        "U": "Not in Scope for EU RoHS/ELV Compliance",
        "U-desc": "<p>These are products that TE Connectivity (TE) considers to be out of scope for the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) and/or the End of Life Vehicles Directive 2000/53/EC (ELV). These typically would be products that are not electrical or electronic in nature nor would be used in electrical/electronic equipment covered by these Directives. Customers should verify this assessment prior to use. &nbsp;</p>\n",
        "N": "Not reviewed for RoHS Compliance",
        "N-desc": "<p>These products have not yet been reviewed for compliance with the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) and the End of Life Vehicles Directive 2000/53/EC (ELV).&nbsp;</p>\n",
        "K": "Customer Controlled (RoHS Info Unknown)",
        "K-desc": "<p>These products have not been reviewed for compliance with the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2) and the End of Life Vehicles Directive 2000/53/EC (ELV). &nbsp;</p>\n"
    },
    "productRoHSCompliance": {
        "C": "EU RoHS Compliant",
        "C-desc": "<p>These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). The RoHS2 Directive requires that certain electrical and electronic equipment products do not contain mercury, cadmium, hexavalent chromium, PBB, PBDE, lead, DEHP, BBP, DBP and DIBP above defined thresholds. Products indicated as 'Compliant' do not contain any of these substances above the prohibition thresholds. Finished electrical and electronic equipment products will be CE marked as required by the Directive. Components may not be CE marked.</p>\n",
        "X": "EU RoHS Compliant with Exemptions",
        "X-desc": "<p>These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). The RoHS2 Directive requires that certain electrical and electronic equipment products do not contain mercury, cadmium, hexavalent chromium, PBB, PBDE, lead, DEHP, BBP, DBP and DIBP above defined thresholds. Products indicated as 'Compliant with Exemptions' contain one or more of these substances above the prohibition thresholds, but are compliant by claiming one or more valid exemptions. Finished electrical and electronic equipment products will be CE marked as required by the Directive. Components may not be CE marked.</p>\n",
        "L": "Not EU RoHS Compliant",
        "L-desc": "<p>These products DO NOT comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). Products indicated as ‘Not Compliant’ contain one or more restricted substances above the prohibition thresholds. Consequently, these products should NOT be used in any application requiring RoHS2 compliance.</p>\n",
        "U": "Out of Scope for EU RoHS",
        "U-desc": "<p>These are products that TE Connectivity considers to be out of scope for the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). Products indicated as ‘Out of Scope’ typically are not electrical or electronic in nature, nor would be used in electrical/electronic equipment covered by this Directive. Customers should verify this assessment prior to use.</p>\n",
        "N": "Not Yet Reviewed for EU RoHS",
        "N-desc": "<p>These products have not yet been reviewed for compliance with the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2).</p>\n"
    },
    "productRoHS10Compliance": {
        "C": "EU RoHS Compliant",
        "C-desc": "These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). The RoHS2 Directive requires that certain electrical and electronic equipment products do not contain mercury, cadmium, hexavalent chromium, PBB, PBDE, lead, DEHP, BBP, DBP and DIBP above defined thresholds. Products indicated as 'Compliant' do not contain any of these substances above the prohibition thresholds. Finished electrical and electronic equipment products will be CE marked as required by the Directive. Components may not be CE marked.",
        "X": "EU RoHS Compliant with Exemptions",
        "X-desc": "These products comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). The RoHS2 Directive requires that certain electrical and electronic equipment products do not contain mercury, cadmium, hexavalent chromium, PBB, PBDE, lead, DEHP, BBP, DBP and DIBP above defined thresholds. Products indicated as 'Compliant with Exemptions' contain one or more of these substances above the prohibition thresholds, but are compliant by claiming one or more valid exemptions. Finished electrical and electronic equipment products will be CE marked as required by the Directive. Components may not be CE marked.",
        "L": "Not EU RoHS Compliant",
        "L-desc": "These products DO NOT comply with the substance restrictions of the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). Products indicated as ‘Not Compliant’ contain one or more restricted substances above the prohibition thresholds. Consequently, these products should NOT be used in any application requiring RoHS2 compliance.",
        "U": "Out of Scope for EU RoHS",
        "U-desc": "These are products that TE Connectivity considers to be out of scope for the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2). Products indicated as ‘Out of Scope’ typically are not electrical or electronic in nature, nor would be used in electrical/electronic equipment covered by this Directive. Customers should verify this assessment prior to use.",
        "N": "Not Yet Reviewed for EU RoHS",
        "N-desc": "These products have not yet been reviewed for compliance with the Restriction on Hazardous Substances Directive 2011/65/EU (RoHS2)."
    },
    "productElvCompliance": {
        "C": "EU ELV Compliant",
        "C-desc": "<p>These products comply with the substance restrictions of the End of Life Vehicles Directive 2000/53/EC (ELV). The ELV Directive requires that materials and components of vehicles do not contain mercury, cadmium, hexavalent chromium, and lead above defined thresholds. Products indicated as ‘Compliant’ do not contain any of these substances above the prohibition thresholds.</p>\n",
        "X": "EU ELV Compliant with Exemptions",
        "X-desc": "<p>These products comply with the substance restrictions of the End of Life Vehicles Directive 2000/53/EC (ELV). The ELV Directive requires that materials and components of vehicles do not contain mercury, cadmium, hexavalent chromium, and lead above defined thresholds. Products indicated as ‘Compliant with Exemptions’ contain one or more of these substances above the prohibition thresholds, but are compliant by claiming one or more valid exemptions.</p>\n",
        "L": "Not EU ELV Compliant",
        "L-desc": "<p>These products DO NOT comply with the substance restrictions of the End of Life Vehicles Directive 2000/53/EC (ELV). Products indicated as ‘Not Compliant’ contain one or more restricted substances above the prohibition thresholds. Consequently, these products should NOT be used in any application requiring ELV compliance.</p>\n",
        "U": "Out of Scope for EU ELV",
        "U-desc": "<p>These are products that TE Connectivity considers to be out of scope for the End of Life Vehicles Directive 2000/53/EC (ELV). Products indicated as ‘Out of Scope’ typically are not materials or components of vehicles. Customers should verify this assessment prior to use.</p>\n",
        "N": "Not Yet Reviewed for EU ELV",
        "N-desc": "<p>These products have not yet been reviewed for compliance with the End of Life Vehicles Directive 2000/53/EC (ELV).</p>\n"
    },
    "productPartStatus": {
        "preliminary": "Preliminary",
        "preliminary-desc": "<p>Has recently been introduced. Please verify availability of these products by contacting the <a href=\"/content/te-com/usa/en/pages/customer-support/connect-with-us.html\">Support Center</a>.&nbsp;</p>\n",
        "active": "Active",
        "active-desc": "<p>Currently a standard inventory or built to order item at a TE Connectivity (TE) site or sites globally. Some ACTIVE products may only be readily available for a region or locale. These active products may become inactive at the sole discretion of TE, as stated in TE Connectivity Corporations' Terms and Conditions.&nbsp;</p>\n",
        "nrd": "Do Not Use for New Design",
        "nrd-desc": "<p>A part that is generally not recommended for new designs because it is nearing or in the decline, end of life, and/or aftermarket phase of its product life cycle.</p>\n",
        "obsolete": "Obsolete",
        "obsolete-desc": "<p>No longer available or recommended for use. It does not have an exact replacement. If a replacement option is provided, refer to the replacement product drawing to validate use in your application.&nbsp;</p>\n",
        "superseded": "Superseded",
        "superseded-desc": "<p>No longer available or recommended for use. It does not have an exact replacement. If a replacement option is provided, refer to the replacement product drawing to validate use in your application.&nbsp;</p>\n",
        "restricted": "Restricted",
        "restricted-desc": "<p>Designed for and only available to a specific customer or is controlled for export. Detailed product features cannot be provided. For more information, please contact your sales engineer or the <a href=\"/content/te-com/usa/en/pages/customer-support/connect-with-us.html\">Support Center</a>.&nbsp;</p>\n",
        "pending-discontinuance": "Pending Obsolescence",
        "pending-discontinuance-desc": "<p>Is being phased out of ACTIVE status.&nbsp;</p>\n"
    },
    "partsList": {
        "myList": "My List",
        "myLists": "My Lists",
        "saveToList": "Save to List",
        "savedToList": "",
        "chooseList": "",
        "removeFomList": "",
        "removedFromList": "",
        "viewList": "View List",
        "viewLists": "View Lists",
        "continueBrowsing": "Continue Browsing",
        "temporaryList": "Temporary List",
        "success": "Your product was successfully saved.",
        "alreadyInList": "This product is already on this list.",
        "error": "The save to list service is experiencing an error. Please try again later.",
        "saveAllToList": "Save All to List",
        "newList": "New List",
        "listLabel": "list"
    },
    "merchandisingCarousel": {
        "viewProductsLabel": "View Products",
        "inStockLabel": "In-Stock",
        "outOfStockLabel": "Non-Stocked",
        "specialOrderLabel": "<p>Special Order</p>",
        "fromLabel": "From"
    }
}

  commerceSettings = {
    "enableLaddNonShippedProducts": false,
    "enableShippingRestrictionsTEUSA": false,
    "enableShippingRestrictionsTESOG": false,
    "guestDataRefreshTimeInCheckout": 30,
    "distRegionPriceDisplayConfig": {
        "South America": false,
        "Middle East": false,
        "Central America": false,
        "Asia": false,
        "Europe": true,
        "Japan": false,
        "Africa": false,
        "North America": true,
        "Oceania": false
    },
    "currencySymbolConfig": {
        "UGS": "Ush",
        "FJD": "FJ$",
        "MXN": "Mex$",
        "STD": "Db",
        "LVL": "Ls",
        "SCR": "Sre",
        "BBD": "Bds$",
        "HNL": "L",
        "UGX": "Ush",
        "ZAR": "R",
        "BSD": "B$",
        "SDD": "ج.س.",
        "ZRN": "NZ",
        "IQD": "ع.د",
        "SDP": "ج.س.",
        "CUP": "$MN",
        "GMD": "D",
        "TWD": "NT$",
        "RSD": "din",
        "ZRZ": "Z",
        "MYR": "RM",
        "FKP": "£",
        "UYP": "$",
        "XOF": "CFA",
        "ARA": "$",
        "UYU": "$",
        "SUR": "₽",
        "CVE": "$",
        "OMR": "ر.ع.",
        "KES": "Ksh",
        "SEK": "kr",
        "BTN": "Nu.",
        "GNF": "FG",
        "MZM": "MT",
        "SVC": "$",
        "ARS": "$",
        "IRR": "﷼",
        "NLG": "fl.",
        "THB": "฿",
        "XPF": "₣",
        "UZS": "so'm",
        "BDT": "৳",
        "LYD": "ل.د",
        "KWD": "د.ك",
        "RUB": "₽",
        "ISK": "kr",
        "BEF": "fr.",
        "RUF": "Rf",
        "MKD": "Ден",
        "RUR": "₽",
        "DZD": "دج",
        "PAB": "B/.",
        "SGD": "S$",
        "KGS": "Лв",
        "HRD": "kn",
        "XAF": "FCFA",
        "ATS": "S",
        "CHF": "Fr.",
        "ITL": "₤",
        "DJF": "Fdj",
        "TZS": "TSh",
        "VND": "₫",
        "ADP": "Pta",
        "AUD": "A$",
        "KHR": "៛",
        "IDR": "Rp",
        "KYD": "$",
        "BWP": "P",
        "SHP": "£",
        "CYP": "£",
        "TJR": "€",
        "RWF": "R₣",
        "AED": "د.إ",
        "DKK": "Kr.",
        "BGL": "Лв.",
        "ZWD": "Z$",
        "MMK": "K",
        "NOK": "kr",
        "SYP": "LS",
        "PSR": "$",
        "YUM": "din.",
        "LKR": "ரூ",
        "CZK": "Kč",
        "IEP": "£",
        "GRD": "Δρχ.",
        "XCD": "$",
        "HTG": "G",
        "BHD": "د.ب",
        "SIT": "SIT",
        "PTE": "$",
        "KZT": "₸",
        "SZL": "E",
        "YER": "﷼",
        "BYB": "Br",
        "AWG": "ƒ",
        "NPR": "Re",
        "MNT": "₮",
        "GBP": "£",
        "HUF": "Ft",
        "BIF": "Fbu",
        "BZD": "$",
        "MOP": "MOP$",
        "NAD": "N$",
        "SKK": "Sk",
        "PEI": "B/.",
        "TMM": "T",
        "PEN": "S/",
        "WST": "WS$",
        "FRF": "₣",
        "GTQ": "Q",
        "CLP": "$",
        "XEU": "XEU",
        "TND": "د.ت",
        "SLL": "le",
        "DOP": "$",
        "KMF": "CF",
        "GEK": "ლ",
        "MAD": "DH",
        "AZM": "₼",
        "TOP": "T$",
        "AZN": "₼",
        "PGK": "K",
        "AZR": "₼",
        "CNH": "¥",
        "UAH": "₴",
        "UAK": "UAK",
        "TPE": "$",
        "MRO": "UM",
        "CNY": "¥",
        "BMD": "$",
        "PHP": "₱",
        "PYG": "₲",
        "JMD": "$",
        "GWP": "GWP",
        "ESP": "Pt",
        "COP": "$",
        "RMB": "¥",
        "USD": "$",
        "ETB": "ብርF",
        "VEB": "Bs.",
        "ECS": "S/.",
        "SOS": "Sh.so.",
        "VEF": "Bs.",
        "VUV": "VT",
        "LAK": "₭",
        "BND": "B$",
        "ZMK": "ZK",
        "LRD": "L$",
        "ALL": "L",
        "GHC": "GH₵",
        "MTL": "Lm",
        "TRL": "₺",
        "USDN": "$",
        "ILS": "₪",
        "GYD": "G$",
        "KPW": "₩",
        "BOB": "Bs.",
        "MDL": "L",
        "AMD": "Դ",
        "TRY": "₺",
        "LBP": "ل.ل.",
        "JOD": "د.ا",
        "HKD": "$",
        "EUR": "€",
        "LSL": "M",
        "CAD": "C$",
        "EEK": "Kr.",
        "MUR": "Rs",
        "ROL": "lei",
        "GIP": "£",
        "RON": "lei",
        "NGN": "₦",
        "CRC": "₡",
        "PKR": "Rs",
        "ANG": "ƒ",
        "LTL": "Lt",
        "SAR": "﷼‎",
        "TTD": "TT$",
        "MVR": "Rf",
        "SRG": "ƒ",
        "INR": "₹",
        "KRW": "₩",
        "JPY": "¥",
        "PLN": "zł",
        "SBD": "Si$",
        "LUF": "F",
        "AOK": "Kz",
        "AON": "Kz",
        "MWK": "MK",
        "AOR": "Kz",
        "BAD": "BAD",
        "NIC": "₪",
        "FIM": "mk",
        "DEM": "€",
        "MGF": "Ar",
        "BAM": "KM",
        "EGP": "E£",
        "BRC": "Cz$",
        "NIO": "C$",
        "NZD": "$",
        "BRL": "R$"
    },
    "vatRestrictedCountries": [
        "NO",
        "CH"
    ],
    "muleFedExAPIServiceUrl": "/api/v1/address/validate",
    "enablePaypalPaymentMode": true
}


  private windowObj: TeV2ArrayWindowObj;
  constructor(private httpClient: HttpClient, @Inject('Window') window: Window) {
    (window as any).teV2 = {
      settings: this.settings,
      urls: this.urls,
      store: this.store,
      cmsSettings: this.cmsSettings
    }
    this.windowObj = { ...window };
  }

  public getWindowObj(): any {
    return window;
  }

  public getTeV2Array(): any {
    return this.windowObj.teV2;
  }

}
