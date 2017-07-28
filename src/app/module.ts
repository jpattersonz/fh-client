import * as ng from 'angular'
import { routes } from './routes'
import * as Config from './config/index';
import * as Decorators from './decorators/index';
import * as Directives from './directives/index';
import * as Services from './services/index'
import * as Components from './components/index'

const requires = [
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'ncy-angular-breadcrumb',
    'md.data.table',
];

export const module = ng.module('fh-client', requires);
module.config(routes);
module.config(Config.MaterialThemeConfig);
module.config(Config.breadcrumbProvider);
module.service(Services.Db.serviceName, Services.Db);
module.decorator(Decorators.state.decorates, Decorators.state);
module.decorator(Decorators.ngSubmit.decorates, Decorators.ngSubmit);
module.directive(Directives.ContentFilter.selector, directiveFactory(Directives.ContentFilter));
module.directive(Directives.FocusIfDirective.selector, directiveFactory(Directives.FocusIfDirective));
module.directive(Directives.FullScreenDirective.selector, directiveFactory(Directives.FullScreenDirective));
module.directive(Directives.FullScreenToggleDirective.selector, directiveFactory(Directives.FullScreenToggleDirective));
module.component(Components.App.selector, new Components.App)
module.component(Components.Landing.selector, new Components.Landing);
module.component(Components.ClientEdit.selector, new Components.ClientEdit);
module.component(Components.ClientList.selector, new Components.ClientList);

function directiveFactory<T>(c: { new(...args: any[]): T; }) {
    let factoryFunc = (...args: any[]) => new (c.bind(c, ...args));
    factoryFunc.$inject = c.$inject || [];
    return factoryFunc as ng.Injectable<ng.IDirectiveFactory>;
}