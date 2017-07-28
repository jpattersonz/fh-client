import * as ng from 'angular'

export class FocusIfDirective implements ng.IDirective {
    static $inject = ['$timeout'];
    constructor(private $timeout: ng.ITimeoutService) { }
    static selector: 'focusIf' = 'focusIf';
    restrict: 'A' = 'A';
    link = ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => {
        let focus = (condition: any) => {
            if (condition) {
                this.$timeout(() => $element.focus(), 0);
            }
        }
        
        if ($attrs['focusIf']) {
            $scope.$watch($attrs['focusIf'], focus);
        } else {
            focus(true);
        }
    }
}