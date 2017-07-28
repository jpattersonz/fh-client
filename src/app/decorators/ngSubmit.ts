import * as ng from 'angular'

ngSubmit.decorates = 'ngSubmitDirective';
ngSubmit.$inject = ['$delegate', '$mdToast'];
export function ngSubmit($delegate: any, $mdToast: ng.material.IToastService): ng.ILogService {
    const directive = <ng.IDirective>$delegate[0];
    directive.require = '^form';
    const compile = directive.compile;
    directive.compile = function (this: any, tElement, tAttrs) {
        var link = compile.apply(this, arguments);
        return function (this: any, scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, form: ng.IFormController) {
            element.bind('submit', function (e) {
                if (form.$invalid) {
                    $mdToast.show($mdToast.simple().textContent('The form is invalid.  Please fix any issues and try again.').toastClass('md-warn').position('bottom right'));
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                }
            });
            link.apply(this, arguments);
        };
    };
    return $delegate;
}