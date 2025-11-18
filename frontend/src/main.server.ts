import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// ✅ AGREGAR ESTA LÍNEA
import 'zone.js/node';

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;