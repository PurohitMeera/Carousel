import { Injectable,OnInit} from '@angular/core';
import { LoggerService } from '../logger.service';
import { TeV2AemService } from '../te-v2-aem.service';


@Injectable({
  providedIn: 'root'
})
export class UrlHelpersService implements OnInit  {

  constructor(private logger:LoggerService,private teV2Service:TeV2AemService) { }

  public pathname=this.teV2Service.getWindowObj().location.pathname;
  public pageURLPath:any;
  public pageURLForm:any;
  public SHORT_FORM = "SHORT_FORM";
  public LONG_FORM = "LONG_FORM";
  public longFormMatch = new RegExp("((https|http):\/\/(.*\\.te(\\.com|\\.com\\.cn))(:*[0-9]*))*\/(content)/([a-z,-]+)/([a-z]+)/([a-z]+)(\/.*)");
  public shortFormMatch = new RegExp("((https|http):\/\/(.*\\.te(\\.com|\\.com\\.cn))(:*[0-9]*))*\/([a-z,-]+)(\/.*)");
  public shortFormSiteMatch = /([a-z]+)-([a-z]{2})/;

  public setURLPath(path:any) :void {

    let shortFormResult = this.shortFormMatch.exec(path);
    let longFormResult = this.longFormMatch.exec(path);

    this.pageURLPath = path;

    if (longFormResult && longFormResult[5] === "content") {
        this.pageURLForm = this.LONG_FORM;
    } else if (shortFormResult && this.shortFormSiteMatch.exec(shortFormResult[6])) { //exex is rexg function we can use test
        this.pageURLForm = this.SHORT_FORM;
    } else {
        this.pageURLForm = this.LONG_FORM;
    }

}

public getURLForm(URI:any) :any {

  let form:any;
  let shortFormResult = <any>this.shortFormMatch.exec(URI);
  let longFormResult = this.longFormMatch.exec(URI);
  let shortFormSiteResult = this.shortFormSiteMatch.exec(shortFormResult[6]);
  let pages = "/pages";

  if (this.pageURLForm === this.SHORT_FORM && shortFormResult && shortFormSiteResult) {

      form = shortFormResult[0];

  } else if (this.pageURLForm === this.SHORT_FORM && longFormResult && longFormResult[6] === "content") {

      form = "/" + longFormResult[8] + "-" + longFormResult[9] + longFormResult[10].substring(longFormResult[10].indexOf(pages) + pages.length);

      //if absolute
      if (longFormResult[1]) {
          form = longFormResult[1] + form;
      }

  } else if (this.pageURLForm === this.LONG_FORM && longFormResult && longFormResult[6] === "content") {

      form = longFormResult[0];

  } else if (this.pageURLForm === this.LONG_FORM && shortFormResult && shortFormSiteResult) {

      form = "/content/te-com/" + shortFormSiteResult[1] + "/" + shortFormSiteResult[2] + pages + shortFormResult[7];

      //if absolute
      if (shortFormResult[1]) {
          form = shortFormResult[1] + form;
      }

  } else {
      this.logger.warn("*** NO URL FORM MATCH ***");
      form = URI;
  }

  return form;
}

public getDeepLinkHash(hash:any) :any {

  let match = new RegExp("([a-z,0-9,-]+)-dl");
  let deepLink;
  let result = match.exec(hash);

  if (result) {
      deepLink = result[0];
      this.logger.debug("deeplink container = " + deepLink);
  }

  return deepLink;
}

public getGeolocatedURL(url:any, country:any, language:any) :any {

  let geolocatedURL;
  let longFormURL = this.longFormMatch.exec(url);
  let shortFormURL = <any>this.shortFormMatch.exec(url);
  let shortFormSiteResult = this.shortFormSiteMatch.exec(shortFormURL[6]);

  if (shortFormURL && shortFormSiteResult) {

      geolocatedURL = "/" + country + "-" + language + shortFormURL[7];

      if (shortFormURL[1]) {
          geolocatedURL = shortFormURL[1] + geolocatedURL;
      }

  } else if (longFormURL && longFormURL[6] === "content") {

      geolocatedURL = "/content/" + longFormURL[7] + "/" + country + "/" + language + longFormURL[10];

      if (longFormURL[1]) {
          geolocatedURL = longFormURL[1] + geolocatedURL;
      }

  } else {

      this.logger.warn("*** NO GEOLOCATION MATCH ***");
      geolocatedURL = false;

  }

  return geolocatedURL;

}

public extractCountryFromURL(url:any) :any {
  /* Search for a forward slash, followed by 3-6 chars that aren't a forward slash,
   followed by a forward slash or a dash, followed by 2 chars that aren't a forward slash,
   followed by a forward slash. Return the 2 chars. And remember, regular expressions
   are a write-only language. */
  let langRegEx = /([^\/]{3,6})[\/|-][^\/]{2}\//;
  let country = langRegEx.exec(url);

  return country ? country[1] : null;
}

public extractLanguageFromURL(url:any) :any {
  /* Search for a forward slash, followed by 3 chars that aren't a forward slash,
   followed by a forward slash or a dash, followed by 2 chars that aren't a forward slash,
   followed by a forward slash. Return the 2 chars. And remember, regular expressions
   are a write-only language. */
  let langRegEx = /[^\/]{3}[\/|-]([^\/]{2})\//;
  let language = langRegEx.exec(url);

  return language ? language[1] : null;
}

public extractQSParamsFromUrl(link:any) :any {
  let vars, hash;
  link = typeof link == "string" ? link : link.toString();
  let q = link.split('?')[1];
  if(q !== undefined){
      vars = [];
      q = q.split('&');
      for(let i = 0; i < q.length; i++){
          hash = q[i].split('=');
          vars[hash[0]] = hash[1];
      }
  }
  return vars;
}

public checkForChinaUrl(redir:any) :any {
  let returnToRegExStr = "^(http|https)(://.*\\.te\\.com\\.cn)/";
  let returnToMatch = new RegExp(returnToRegExStr);
  let returnToUrlTest = returnToMatch.test(redir);
  return returnToUrlTest;
}

public removeParam(key:any, sourceURL:any) :any {
  let url = sourceURL.split('?');
  let rtnUrl = url[0],
      param,
      params_arr = [];
  if (url[1]) {
      params_arr = url[1].split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
          param = params_arr[i].split("=")[0];
          if (param === key) {
              params_arr.splice(i, 1);
          }
      }
      rtnUrl = rtnUrl + "?" + params_arr.join("&");
      let urlLength = rtnUrl.length;
      if(rtnUrl.charAt(urlLength-1)==='?')
      rtnUrl=rtnUrl.slice(0,urlLength-1); 
  }
  return rtnUrl;
}

public sanitizeReturnToURL(basePath:any, returnToUrl:any) :any {

  //logger.debug("passed urls = ", basePath, returnToUrl);

  let shortFormMatch, shortBasePath, shortReturnToUrl,
      longFormMatch, longBasePath, longReturnToUrl,
      selfServiceRegExStr, selfServiceMatch, selfServiceReturnToUrl,
      countryLangFragment, sanitizedDomain, sanitizedHref,
      baseCountry, baseLanguage,
      chnMatch, isChnBasePath;

  // Fully qualified url is required
  let returnToRegExStr = "^(http|https)(://.*\\.te\\.com|://.*\\.te\\.com\\.cn)/";
  let returnToMatch = new RegExp(returnToRegExStr);
  let returnToUrlExec = returnToMatch.exec(returnToUrl);

  // Fully qualified url and absolute path are allowed
  let baseRegExStr = "^(http|https|)(://.*\\.te\\.com|://.*\\.te\\.com\\.cn|)/";
  let baseMatch = new RegExp(baseRegExStr);
  let basePathExec = baseMatch.exec(basePath);

  if (returnToUrlExec && basePathExec) {
      // Short form url, e.g. http://local.te.com/global-en/path/to/page.html
      shortFormMatch = new RegExp(baseRegExStr + "([a-z,-]+-[a-z,-]+/)(.*)");
      shortBasePath = shortFormMatch.exec(basePath);
      shortReturnToUrl = shortFormMatch.exec(returnToUrl);

      // Long form url, e.g. http://local.te.com/content/te-demo/global/en/path/to/page.html
      longFormMatch = new RegExp(baseRegExStr + "content/([a-z,-]+/)([a-z]+/[a-z]+/)(.*)");
      longBasePath = longFormMatch.exec(basePath);
      longReturnToUrl = longFormMatch.exec(returnToUrl);

      // Self-Service app
      selfServiceRegExStr = "^(http|https)(://.*\\.te\\.com|://.*\\.te\\.com\\.cn)/(.*)";
      selfServiceMatch = new RegExp(selfServiceRegExStr);
      selfServiceReturnToUrl = <any>selfServiceMatch.exec(returnToUrl);

      baseCountry = this.extractCountryFromURL(basePath);
      baseLanguage = this.extractLanguageFromURL(basePath);
      chnMatch = /(\.cn\/?)$/;
      isChnBasePath = (chnMatch.test(basePathExec[0]) || baseCountry === 'chn');

      sanitizedDomain = returnToUrlExec[1] + returnToUrlExec[2];

      // add CN domain if target URL is China
      if (!isChnBasePath) {
          sanitizedDomain = sanitizedDomain.replace(/\.cn$/, '');
      } else if (!chnMatch.test(returnToUrlExec[0])) {
          sanitizedDomain += '.cn';
      }

      if (shortReturnToUrl) {
          countryLangFragment = shortBasePath ? shortBasePath[3] : baseCountry + "-" + baseLanguage + "/";
          sanitizedHref = sanitizedDomain + '/' + countryLangFragment + shortReturnToUrl[4];
      }

      if (longReturnToUrl) {
          countryLangFragment = longBasePath ? longBasePath[4] : baseCountry + "/" + baseLanguage + "/";
          sanitizedHref = sanitizedDomain + "/content/" + longReturnToUrl[3] + countryLangFragment + longReturnToUrl[5];
      }

      // Self-service apps
      if (!shortReturnToUrl && !longReturnToUrl) {
          sanitizedHref = sanitizedDomain + "/" + selfServiceReturnToUrl[3];
      }
  }

  return sanitizedHref;
}

ngOnInit(): void {
    console.log("Path",this.pathname);
    this.setURLPath(this.pathname);
  }

// $(window.document).on("GLOBAL-INIT", function () { 
//     setURLPath(window.location.pathname);
// });

}
