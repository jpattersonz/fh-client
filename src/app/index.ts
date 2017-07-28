import 'angular/angular.js'
import 'angular-ui-router/release/angular-ui-router.js'
import 'angular-aria/angular-aria.js'
import 'angular-animate/angular-animate.js'
import 'angular-material/angular-material.js'
import 'angular-material-data-table/dist/md-data-table.js'
import 'angular-messages/angular-messages.js'

import 'angular-breadcrumb/dist/angular-breadcrumb.js'

import 'font-awesome/css/font-awesome.css'
import 'angular/angular-csp.css'
import 'angular-material/angular-material.css'
import 'angular-material-data-table/dist/md-data-table.css'
import 'animate.css/animate.css'

import '../styles/animations.css'
import '../styles/material.css'
import '../styles/global.css'

import * as ng from 'angular';

ng.element(document).ready(() => ng.bootstrap(document, ['fh-client']));

export * from './module'