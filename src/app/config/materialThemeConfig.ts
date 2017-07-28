import * as ng from 'angular'

export class MaterialThemeConfig {
    public static $inject = ["$mdThemingProvider"];
    constructor($mdThemingProvider: ng.material.IThemingProvider) {

        $mdThemingProvider.theme("fh")
                .primaryPalette("teal")
                .accentPalette("amber")
                .warnPalette("deep-orange")
                .backgroundPalette("grey")
                .dark(false);

        $mdThemingProvider.setDefaultTheme("fh");
    }
}