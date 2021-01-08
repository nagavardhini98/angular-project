// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { url } from "inspector";

export const environment = {
  production: false,
  user:1,
  dot_net_url: "http://localhost:61898",
  java_url:"http://localhost:8080/SpringMVCRestProject",
  setuser(user_id:number){
    this.user=user_id;
  }
};





/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
