import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Proveedor de rutas
    importProvidersFrom(BrowserModule, RouterModule, HttpClientModule, SocketIoModule.forRoot(config)) // Importa HttpClientModule
  ]
}).catch((err) => console.error(err));





