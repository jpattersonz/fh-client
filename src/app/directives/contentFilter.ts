import * as ng from 'angular'
import { Subject } from 'rxjs'

export class ContentFilter implements ng.IDirective {    
    static $inject = ['$parse'];
    constructor(private $parse: ng.IParseService) {
    }
    static selector: 'contentFilter' = 'contentFilter';
    restrict: 'A' = 'A';
    scope: false = false;
    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        var func = this.$parse(attrs["contentFilter"]);
        var subject = new Subject<string>();
        scope.$watch<string>(s => s.$root["contentFilter"], (newValue) => {
            subject.next(newValue);
        });
        var subscription = subject
            .debounceTime(300)
            .subscribe(filter => {
                scope.$evalAsync(() => func(scope, { $filter: filter }));
            });
        scope.$on('$destroy', () => subscription.unsubscribe());
    };
}