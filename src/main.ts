import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MyappAppComponent, environment } from './app/';
import { AppSettings, ISettings } from './app/shared/';

if (environment.production) {
  enableProdMode();
}

fetch('/settings', { method: 'get' }).then((response) => {
  response.json().then((settings: ISettings) => {
    AppSettings.settings = settings;
    if (AppSettings.settings.environment == 'production') {
      enableProdMode();
    };
    bootstrap(MyappAppComponent);

  });
});


