import { Injectable } from '@angular/core';
import 'jquery-throttle-debounce';
import { LoggerService } from '../logger.service';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  // throttle = ($ as any).throttle || (window as any).Cowboy.throttle;
  body = $('body');
  screen: any;


  constructor(private logger: LoggerService) {
    this.screen = {

      listeners: [],
      state: {
        inited: false,
        tests: []
      }
    };
  }

  init() {

    if (!this.screen.state.inited) {

      this.screen.state.tests = [
        {
          name: 'mobile',
          className: 'te-mobile-test'
        },
        {
          name: 'desktop',
          className: 'te-desktop-test'
        },
        {
          name: 'desktopWide',
          className: 'te-desktop-wide-test'
        },
        {
          name: 'desktopSmall',
          className: 'te-desktop-small-test'
        }
      ].map(function (_item) {
        const item: any = _item;
        item.elm = window.document.createElement('div');
        item.elm.className = item.className;
        window.document.body.appendChild(item.elm);
        return item;

      });
    }

    this.screen.state.inited = true;

  }

  getState() {

    //make sure its inited.
    this.init();

    //for when viewport is needed...
    // const w = window,
    //     d = document,
    //     e = d.documentElement,
    //     g = d.getElementsByTagName('body')[0],
    //     x = w.innerWidth || e.clientWidth || g.clientWidth,
    //     y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    const ret: any = {
      isResponsivePage: this.body.hasClass('responsive'),
      isWideScreenSupportedPage: this.body.hasClass('wide-screen-support')
      // screen: window.screen,
      // viewport: {
      //     width: x,
      //     height: y
      // }
    };

    this.screen.state.tests.forEach(function (test: any) {
      var display = test.elm.currentStyle ? test.elm.currentStyle.display :
        window.getComputedStyle(test.elm, null).display;
      ret[test.name] = (display !== 'none');
    });

    return ret;
  }

  onResize() {

    var state = this.getState();

    //logger.info(state);

    this.screen.listeners.forEach((listener: any) => {
      try {
        listener(state);
      } catch (error) {
        this.logger.error(error);
      }
      // window.setTimeout(function(){
      //     listener(state);
      // },0);
    });

  }

  addResizeListener(fn: any) {

    this.screen.listeners.push(fn);

    if (!this.screen.addedResize) {

      // $(window).on('resize', this.throttle(150, this.onResize));

      this.screen.addedResize = true;
    }

  }

  removeResizeListener(fn: any) {
    this.screen.listeners = this.screen.listeners.filter(function (listener: any) {
      return listener !== fn;
    });
  }
}
