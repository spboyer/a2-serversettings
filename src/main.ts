import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MyappAppComponent, environment, appSettings, ISettings } from './app/';

if (environment.production) {
  enableProdMode();
}

fetch('/settings', { method: 'get' }).then((response) => {
  response.json().then((settings: ISettings) => {
    appSettings.settings = settings;
    if (appSettings.settings.environment == 'production') {
      enableProdMode();
    };
    bootstrap(MyappAppComponent);

  });
});


