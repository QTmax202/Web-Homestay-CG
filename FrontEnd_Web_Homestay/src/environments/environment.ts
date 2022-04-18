// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/',
  firebaseConfig : {
    apiKey: "AIzaSyBreE-HEeEviMPLa4TfGLRojjL_PBEkud8",
    authDomain: "web-homestay-cg.firebaseapp.com",
    databaseURL: "https://web-homestay-cg-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "web-homestay-cg",
    storageBucket: "web-homestay-cg.appspot.com",
    messagingSenderId: "355394003399",
    appId: "1:355394003399:web:1910e01cd75dfbe8c9b9e2"
  }

};

export const pathUrl = 'http://localhost:8080/api/';
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
