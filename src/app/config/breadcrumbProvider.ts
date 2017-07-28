
breadcrumbProvider.$inject = ['$breadcrumbProvider'];
export function breadcrumbProvider($breadcrumbProvider: any) {
    $breadcrumbProvider.setOptions({
        template: `
<div layout="row" layout-align="start center" style="overflow: hidden;">
<div ng-repeat="step in steps | filter:{ abstract: '!' }" layout="row" layout-align="start center">
<i ng-if="!$first" class="fa fa-chevron-right" style="font-size:0.75rem;"></i>
<md-button class="md-button" style="margin-top: 0px; margin-bottom: 0px; min-width: 0px; text-transform:none;" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</md-button>
</div>
</div>`,
        includeAbstract: true,
    });
}