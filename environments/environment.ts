// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dialogflow: {
    chatBot: '0db2e822b3984b1d97b1b8b77a620b23'
  },
        // backEndUrl: 'https://log-in-api.dotit-corp.com'
         //backEndUrl: 'http://41.227.21.171:8080'
         // backEndUrl: 'http://cdd-api.dotit-corp.com'
         // backEndUrl: 'http://127.0.0.1:8000',
        backEndUrl: 'https://api.log-in.tn'
        // backEndUrl: 'http://192.168.1.211:8000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
