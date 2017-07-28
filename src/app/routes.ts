import * as ng from 'angular'
import { Db } from './services/index'

declare module 'angular' {
    export namespace ui {
        interface IState {
            ncyBreadcrumb?: {
                label?: string;
                parent?: string;
                skip?: boolean;
            }
        }
    }
}

routes.$inject = ["$stateProvider", "$urlRouterProvider"];
export function routes($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

    $stateProvider
        .state('/',
            {
                url: '',
                template: '<landing></landing>',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
        .state('client-list',
        {
            url: '/clients',
            parent: '/',
            views: {
                "@": {
                    template: '<client-list></client-list>',
                }
            },
            ncyBreadcrumb: {
                label: 'Clients',
                parent: '/',
            }
        })
        .state('client-edit',
        {
            url: '/:clientId',
            parent: 'client-list',
            views: {
                '@': {
                    template: '<client-edit item="item"></client-edit>',
                    controller: CopyControllerFactory('item'),
                }
            },
            resolve: {
                item: ['$stateParams', 'db', ($stateParams: any, db: Db) =>
                    db.Clients.filter(function(this: number, x) { return x.id == this; }, $stateParams["clientId"])[0]
                ],
            },
            ncyBreadcrumb: {
                label: '{{item.firstName}} {{item.lastName}}',
            },
        })
    ;

}

function CopyControllerFactory(...keys: any[]) {
    var f: any[] = [];
    f.push('$scope');
    for (var key of keys)
        f.push(key);
    f.push(function ($scope: any, ...values: any[]) {
        for (var i = 0; i < keys.length; i++)
            $scope[keys[i]] = values[i];
    });
    return f;
};