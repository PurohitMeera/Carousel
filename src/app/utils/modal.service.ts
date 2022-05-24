import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';
import { ScreenService } from '../utils/screen.service';

declare let $: any;
@Injectable({
    providedIn: 'root'
})
export class ModalService {
    SIZES = {
        SMALL_10: 'small-10',
        SMALL_15: 'small-15',
        SMALL_25: 'small-25',
        TOP_ALIGN_RESPONSIVE_HEIGHT: 'customer-service-responsive-modal',
        MEDIUM_20: 'medium-20',
        FULL_20: 'full',
        MEDIUM_25: 'medium-25'
    };
    EVENTS = {
        HEIGHT_CHANGED: 'HEIGHT_CHANGED'
    };
    defaults = {
        size: this.SIZES.MEDIUM_20,
        $srcElm: null,
        closeBtnAlignment: '',
        closeBtnSize: 'icon-large',
        closeCallback: null,
        title: ''
    };


    $modalBg = $('#modal-bg');
    $body = $('body');
    $modalBody = this.$modalBg.find('#modal-body');
    $modalContent = this.$modalBody.find('#modal-content');
    instanceOptions = $.extend(this.defaults);
    $modalTitle = this.$modalBody.find('#modal-title');

    constructor(private _logger: LoggerService, private _screenService: ScreenService) { }

    create(htmlContent: any, options: any) {
        this._logger.info('modal create');
        //make sure there is a template.

        //clear existing modalBgClass (if any)
        if (!options) { //when there are no options
            options = {
                modalBgClass: ""
            };
        } else if (!options.modalBgClass) { //when there are options but no modalBgClass
            options.modalBgClass = "";
        }

        if (options.iconClass) {
            options.closeBtnSize = "";
        } else {
            options.iconClass = "icon icon-close";  //default modal close icon
        }

        this.instanceOptions = $.extend(this.defaults, options || {});

        this.$modalBg = $('#modal-bg');

        if (this.$modalBg.length === 0) {
            this.injectTemplate();
            this.$modalBg = $('#modal-bg');
        } else {
            this.$modalBg.find(".modal-close i").removeClass().addClass(this.instanceOptions.iconClass + ' ' + this.instanceOptions.closeBtnSize);
        }
        this.$modalBg.removeClass().removeAttr("style").addClass(options.modalBgClass);

        this.$modalBody = this.$modalBg.find('#modal-body');
        this.$modalContent = this.$modalBody.find('#modal-content');
        this.$modalTitle = this.$modalBody.find('#modal-title');
        this.$modalContent.html(htmlContent);
        this.$modalTitle.html(this.instanceOptions.title);
        this.$modalBody.attr('class', this.instanceOptions.size);

        this.$modalBg.find('.modal-close').on('click', this.closeModal);
        this.openModal();
        this.focusModal();
        //fixOrLoose();
    }

    focusModal() {
        this.$modalBg.focus();
    }

    openModal() {
        this.$modalBg.attr('aria-hidden', false);
        if(!this.instanceOptions.ignoreBackgroundMaskClick){
            this.$modalBg.on('click', this.onBgClicked);
        }
        this.$modalBg.find('.modal-close').on('click', this.closeModal);
        this.$body.on('keydown', this.handleKeyPress);
        this._screenService.addResizeListener(this.screenResized);
        let that = this;
        this.$modalBody.on(this.EVENTS.HEIGHT_CHANGED, function() {
            window.setTimeout(that.adjustModalPosition, 0);
        });

        // Add focus implementation
        $(window.document).on('focus', this.focusRestrict);

        this.$body.addClass('open-modal');
        this.$modalContent.delay(500).queue(function() {
            that.adjustModalPosition();
        }).dequeue();
    }

    closeModal($evt: any) {

        if ($evt) {
            $evt.preventDefault();
        }

        if (this.$modalBg !== null) {
            //unbind listeners
            this.$modalBg.attr('aria-hidden', true).off('click', this.onBgClicked);
            this.$modalBg.find('.modal-close').off('click', this.closeModal);
            this.$body.off('keydown', this.handleKeyPress);
            this._screenService.removeResizeListener(this.screenResized);
            this.$modalBody.off(this.EVENTS.HEIGHT_CHANGED);
            this.$modalContent.off('load');

            $(window.document).off('focus', this.focusRestrict);

            if (this.instanceOptions.$srcElm) {
                $(this.instanceOptions.$srcElm).focus();
            }

            //we want to animate out:
            this.$body.removeClass('open-modal');

            this.$modalBg.removeClass('scrollable');

            if (this.instanceOptions.closeCallback) {
                this.instanceOptions.closeCallback();
            }

            //need to remove instance because the need to update modal visual per modal request
            this.$modalBg.remove();
            this.$modalBg = null;
        } else {
            $(window.document).off('focus', this.focusRestrict);
            this.$body.removeClass('open-modal');
            $('#modal-bg').removeClass('scrollable');
            $('#modal-bg').remove();
        }

        if ($('body').hasClass('body-modal-open')) {
            $('body').removeClass('body-modal-open');
        }
        if ($('body').hasClass('body-modal-open-live-chat')) {
            $('body').removeClass('body-modal-open-live-chat');
        }

        if ($('body').hasClass('payment-address-modal')) {
            $('body').removeClass('payment-address-modal');
            $(window).off('resize');
        }
        if ($('body').hasClass('BrightCoveVideo')) {
            $('body').removeClass('BrightCoveVideo');
            /* jshint ignore:start */
            //videojs("te-brightcove-trigger-video").dispose();
            /* jshint ignore:end */
        }
    }

    onBgClicked($evt: any) {
        //make sure we didn't click on the modal-bg
        var $elm = $($evt.target);
        if ($elm.parent().closest('#modal-bg').length === 0 &&
            $elm.closest('body').length > 0 //very strange bug when clicking elipssis in pagination?
            //event fires outside of body?
        ) {
            $evt.preventDefault();
            this.closeModal('');
        }
    }

    handleKeyPress($evt: any) {
        if ($evt.keyCode === 27) {
            this.closeModal('');
        } else if ($evt.keyCode === 9) {
            this.focusRestrict($evt);
        }
    }

    focusRestrict($evt: any) {
        var elem = $evt.srcElement || $evt.target;

        if (this.$body.hasClass('open-modal') && (this.$modalBg.has(elem).length <= 0)) {
            $evt.stopPropagation();
            this._logger.info(elem);
            this.$modalBg.focus();
        }
    }

    screenResized() {
        this.adjustModalPosition();
    }

    adjustModalPosition() {
        if (this._screenService.getState().mobile) {
            this.removeModalAdjustments();
            return;
        }
        if (this.$modalContent.outerHeight() > this.$modalBody.height()) {
            this.$modalBody.height(this.$modalContent.outerHeight());
        }


        var closeButtonTop = 0,
            minTop = 70,
            isScrollable = this.$modalBody.height() > this.$modalBg.height();

        let modalCenter = {
            halfHeight: (this.$modalBg.height() - this.$modalBody.height()) / 2,
            halfWidth: (this.$modalBg.width() - this.$modalBody.width()) / 2
        };

        this.$modalBody.css({
            'left': modalCenter.halfWidth,
            'top': modalCenter.halfHeight,
            'zoom': 1,
            'position': 'absolute'
        });

        closeButtonTop = this.$modalBody.find('.modal-close').offset().top;

        if (closeButtonTop < minTop) {
            this.$modalBody.css('top', minTop);
        }

        if (isScrollable) {
            this.$modalBg.addClass('scrollable');
            this.$modalBody.css({
                'left': modalCenter.halfWidth,
                'top': minTop,
                'zoom': 1,
                'position': 'absolute'
            });
        }
    }

    removeModalAdjustments() {
        this.$modalBody.attr('style', '');
        this.$modalBg.removeClass('scrollable');
    }

    injectTemplate() {
        var template = '<div id="modal-bg" tabindex="-1">' +
            '<div id="modal-body" role="dialog">' +
            '<h5 id="modal-title" class="mobile"></h5>' +
            '<a href="#" aria-label="close" class="modal-close btn-block-6 btn-clr-7 ' + this.instanceOptions.closeBtnAlignment + '"><i class="' + this.instanceOptions.iconClass + ' ' + this.instanceOptions.closeBtnSize + '" role="presentation"></i>back</a>' +
            '<div id="modal-content"></div>' +
            '</div>' +
            '</div>';

        this.$body.append(template);
    }
}


