import * as ng from 'angular'

export class FullScreenDirective implements ng.IDirective {
    static selector: 'fullscreen' = 'fullscreen';
    restrict: 'A' = 'A';
    controller = FullScreenController as ng.Injectable<ng.IControllerConstructor>;
}

export class FullScreenController {
    static $inject = ['$scope', '$element', '$attrs', '$parse']
    constructor(private $scope: ng.IScope, private $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $parse: ng.IParseService) {
        this.fn = $parse($attrs['fullscreen']);
    }
    private fn: ng.ICompiledExpression;
    
    toggleFullscreen = () => {
        this.$element.toggleClass('fullscreen');
        this.$scope.$evalAsync(() => {
            this.fn(this.$scope, { $event: event, $fullscreen: this.$element.hasClass('fullscreen') });
        });
    }
}

export class FullScreenToggleDirective implements ng.IDirective {
    static selector: 'fullscreenToggle' = 'fullscreenToggle';
    restrict: 'E' = 'E';
    require = { fullscreen: '^^' } as { fullscreen: '^^' };
    template = `
<md-button class="md-icon-button md-primary" style="padding-top:0px; padding-bottom: 0px; height:auto;" aria-label="Fullscreen"
        ng-click="fullscreen = !fullscreen">
    <md-tooltip md-direction="left">Fullscreen</md-tooltip>
    <i ng-class="{ 'fa fa-expand' : !fullscreen, 'fa fa-compress': fullscreen }" style="vertical-align: middle;"></i>
</md-button>
    `;
    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controllers: { fullscreen : FullScreenController }) => {
        element.on("click touchstart", function (event) {
            controllers.fullscreen.toggleFullscreen();
        });
    }
}