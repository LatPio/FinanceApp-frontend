import {InjectionToken, NgModule} from "@angular/core";


export class AppConfig {
  apiEndpoint:string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:8080/api'
};

@NgModule({
  providers:[{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule{}
