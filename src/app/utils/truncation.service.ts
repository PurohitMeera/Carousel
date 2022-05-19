import { Injectable } from '@angular/core';
import 'jquery.dotdotdot';
import { LoggerService } from '../logger.service';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class TruncationService {

  constructor(private logger: LoggerService) {
    $(window.document).on("GLOBAL-INIT", () => {
      this.init();
    });
  }

  expand($el: any) {
    if ($el && $el.length > 0) {
      $el.find(".truncate").dotdotdot();
    } else {
      ($(".truncate") as any).dotdotdot();
    }
  }

  init($el?: any) {
    this.logger.info('truncation initiated');
    this.expand($el);
  }
}
