import * as ng from 'angular'

declare module 'angular' {    
    export namespace ui {
        interface IStateService {
            back(): void;
            forward(): void;
        }
    }
}

state.decorates = '$state';
state.$inject = ['$delegate', '$window'];
export function state($delegate: ng.ui.IStateService, $window: ng.IWindowService): ng.ui.IStateService {
    $delegate.back = () => $window.history.back();
    $delegate.forward = () => $window.history.forward();
    return $delegate;
}