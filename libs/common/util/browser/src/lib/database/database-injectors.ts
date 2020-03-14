import { InjectionToken } from '@angular/core';
import { DBConfig } from './database-config';

export const DATABASE_CONFIG = new InjectionToken<DBConfig>('DatabaseConfig');