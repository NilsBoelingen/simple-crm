import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-628fb","appId":"1:598653945559:web:9a76d1b67b98e0449f1292","storageBucket":"simple-crm-628fb.appspot.com","apiKey":"AIzaSyAif1k_dnwqCiWe0oC1pAEmDNz9KqU-TiQ","authDomain":"simple-crm-628fb.firebaseapp.com","messagingSenderId":"598653945559"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
