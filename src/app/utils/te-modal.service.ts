import { Injectable } from '@angular/core';
import { ModalService } from '../utils/modal.service';

declare let $: any;

@Injectable({
    providedIn: 'root'
})

export class TeModalService {
    modalScope: any;
    defaults = {
        size: this._modalService.SIZES.MEDIUM_20,
        $srcElm: null,
        scope: null
    };

    constructor(private _modalService: ModalService) { }
    
    close() {
        this._modalService.closeModal('');
    }

    create(htmlContent: any, options: any, extraScopeVars: any) {
        options = $.extend(this.defaults, options || {}); //options defined in constructor
        this.buildModal(options, extraScopeVars, htmlContent);
    }

    buildModal(options: any, extraScopeVars: any, htmlContent: any) {
        this.modalScope = (options.scope) ? options.scope.$new() : '';
        if (extraScopeVars) {
            this.modalScope = $.extend(this.modalScope, extraScopeVars);
        }
        $.compile(htmlContent)(this.modalScope, this.onCompileComplete);
    }

    onCompileComplete(content: any, newModalScope: any, options: any) {
        var modalContent = content,
            modalOptions = {
                size: options.size || this._modalService.SIZES.MEDIUM_20,
                $srcElm: options.$srcElm || null,
                closeBtnAlignment: options.closeBtnAlignment,
                closeBtnSize: options.closeBtnSize,
                closeCallback: options.closeCallback || this.killModal,
                ignoreBackgroundMaskClick: options.ignoreBackgroundMaskClick,
                EVENTS: this._modalService.EVENTS,
                title: options.title || ''
            };

        this.modalScope = newModalScope;
        setTimeout(() => {
            this._modalService.create($.element(modalContent), modalOptions);
        });

    }

    killModal(){
        if(this.modalScope) {
            this.modalScope.$destroy();
            this.modalScope = null;
        }
    }
}