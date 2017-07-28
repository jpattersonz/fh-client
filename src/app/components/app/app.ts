import url from './app.html'
import * as ng from 'angular'

export class ComponentOptions implements ng.IComponentOptions {
    controller = Controller;
    static selector = 'app' as 'app';
    templateUrl = url;
}
export class Controller implements ng.IComponentController {
    showSearch = false;
    focusSearchIcon = false;

    public static $inject = ['$state', '$rootScope', '$window'];
    constructor(private $state: ng.ui.IStateService, private $rootScope: ng.IRootScopeService, private $window: ng.IWindowService) {
    }
    
    $onInit = () => {
        this.$rootScope.$on('$stateChangeSuccess', () => this.$rootScope['contentFilter'] = "");
    }

    private toggleSearch = () => {
        this.showSearch = !this.showSearch;
        if (!this.showSearch) {
            this.$rootScope["contentFilter"] = "";
        }
    }

    private blurSearch = () => {
        this.showSearch = !!this.$rootScope["contentFilter"];
    }

    private onKeyUp = (e: JQueryEventObject) => {
        if (!e.ctrlKey && !e.shiftKey) {
            switch (e.keyCode) {
                case 27: // escape;
                    this.toggleSearch();
                    this.focusSearchIcon = true;
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
            }
        }
    }
}