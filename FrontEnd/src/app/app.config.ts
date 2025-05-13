import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync, } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './core/model/page/CustomMatPaginatorIntl';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes), 
              provideHttpClient(withFetch()),
                provideAnimationsAsync(),
                provideNativeDateAdapter(),
                { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
                // BrowserAnimationsModule,
              ]
};
