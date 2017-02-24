/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/flex-layout': 'npm:@angular/flex-layout/bundles/flex-layout.umd.js',
      'hammerjs': 'npm:hammerjs/hammer.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      'ag-grid-ng2': 'node_modules/ag-grid-ng2',
      'ag-grid': 'node_modules/ag-grid',

      'ts-clipboard': 'npm:ts-clipboard/ts-clipboard.js',

      'lodash': 'node_modules/lodash/lodash.js'

    },
    meta: {
      'lodash': {format: 'amd'},
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        main: './Rx.js',
        defaultExtension: 'js'
      },
      'ag-grid': {
        main: 'main.js'
      },
      'ag-grid-ng2': {
        main: 'main.js'
      },
      'ts-clipboard': {
        defaultExtension: 'js'
      }
    }
  });
})(this);
