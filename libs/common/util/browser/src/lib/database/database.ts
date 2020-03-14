import { Inject, Injectable } from '@angular/core';
import { DBConfig, Stores } from './database-config';
import { DATABASE_CONFIG } from './database-injectors';

@Injectable({
  providedIn: 'root'
})
export class Database implements DBConfig {
  db
  name: string;
  version: number;
  stores: Stores;

  constructor(
    @Inject(DATABASE_CONFIG) private config: DBConfig
  ) {
    this.db = null;
    this.name = config.name;
    this.version = config.version;
    this.stores = config.stores;

    console.log(config);

    // ConfigManagerInstance().then( (configManager) => {

    //   var config = configManager.config;

    //   this.db = null;
    //   this.name = config.name;
    //   this.version = config.version;
    //   this.stores = config.stores;

    // });
  }

  getStore(storeName) {

    if (!this.stores[storeName])
      throw 'There is no store with name "' + storeName + '"';

    return this.stores[storeName];
  }

  open() {

    if (this.db)
      return Promise.resolve(this.db);

    return new Promise((resolve, reject) => {

      var dbOpen = indexedDB.open(this.name, this.version);

      dbOpen.onupgradeneeded = (e) => {
        this.db = (e.target as IDBRequest).result;

        const storeNames = Object.keys(this.stores);
        let storeName: string;

        for (var s = 0; s < storeNames.length; s++) {

          storeName = storeNames[s];

          // If the store already exists
          if (this.db.objectStoreNames.contains(storeName)) {

            // Check to see if the store should be deleted.
            // If so delete, and if not skip to the next store.
            if (this.stores[storeName].deleteOnUpgrade)
              this.db.deleteObjectStore(storeName);
            else
              continue;
          }

          var dbStore = this.db.createObjectStore(
            storeName,
            this.stores[storeName].properties
          );

          if (typeof this.stores[storeName].indexes !== 'undefined') {
            var indexes = this.stores[storeName].indexes;
            var indexNames = Object.keys(indexes);
            var index;

            for (var i = 0; i < indexNames.length; i++) {
              index = indexNames[i];
              dbStore.createIndex(index, index, indexes[index]);
            }
          }
        }
      }

      dbOpen.onsuccess = (e) => {
        this.db = (e.target as any).result;
        resolve(this.db);
      }

      dbOpen.onerror = (e) => {
        reject(e);
      };

    });
  }

  close() {

    return new Promise((resolve, reject) => {

      if (!this.db)
        reject('No database connection');

      this.db.close();
      resolve(this.db);

    });
  }

  nuke() {
    return new Promise((resolve, reject) => {

      console.log("Nuking... " + this.name);

      this.close();

      var dbTransaction = indexedDB.deleteDatabase(this.name);
      dbTransaction.onsuccess = (e) => {
        console.log("Nuked...");
        resolve(e);
      }

      dbTransaction.onerror = (e) => {
        reject(e);
      }
    });
  }

  put(storeName, value, key) {

    return this.open().then((db) => {

      return new Promise((resolve, reject) => {

        var dbTransaction = db.transaction(storeName, 'readwrite');
        var dbStore = dbTransaction.objectStore(storeName);
        var dbRequest = dbStore.put(value, key);

        dbTransaction.oncomplete = (e) => {
          resolve(dbRequest.result);
        }

        dbTransaction.onabort =
          dbTransaction.onerror = (e) => {
            reject(e);
          }

      });

    });

  }

  get(storeName, value) {

    return this.open().then((db) => {

      return new Promise((resolve, reject) => {

        var dbTransaction = db.transaction(storeName, 'readonly');
        var dbStore = dbTransaction.objectStore(storeName);
        var dbStoreRequest;

        dbTransaction.oncomplete = (e) => {
          resolve(dbStoreRequest.result);
        }

        dbTransaction.onabort =
          dbTransaction.onerror = (e) => {
            reject(e);
          }

        dbStoreRequest = dbStore.get(value);

      });

    });

  }

  getAll(storeName, index, order) {

    return this.open().then((db) => {

      return new Promise((resolve, reject) => {

        var dbTransaction = db.transaction(storeName, 'readonly');
        var dbStore = dbTransaction.objectStore(storeName);
        var dbCursor;

        if (typeof order !== 'string')
          order = 'next';

        if (typeof index === 'string')
          dbCursor = dbStore.index(index).openCursor(null, order);
        else
          dbCursor = dbStore.openCursor();

        var dbResults = [];

        dbCursor.onsuccess = (e) => {
          var cursor = e.target.result;

          if (cursor) {
            dbResults.push({
              key: cursor.key,
              value: cursor.value
            });
            cursor.continue();
          } else {
            resolve(dbResults);
          }
        }

        dbCursor.onerror = (e) => {
          reject(e);
        }

      });

    });
  }

  delete(storeName, key) {
    return this.open().then((db) => {

      return new Promise((resolve, reject) => {

        var dbTransaction = db.transaction(storeName, 'readwrite');
        var dbStore = dbTransaction.objectStore(storeName);

        dbTransaction.oncomplete = (e) => {
          resolve(e);
        }

        dbTransaction.onabort =
          dbTransaction.onerror = (e) => {
            reject(e);
          }

        dbStore.delete(key);

      });
    });
  }

  deleteAll(storeName) {

    return this.open().then((db) => {

      return new Promise((resolve, reject) => {

        var dbTransaction = db.transaction(storeName, 'readwrite');
        var dbStore = dbTransaction.objectStore(storeName);
        var dbRequest = dbStore.clear();

        dbRequest.onsuccess = (e) => {
          resolve(e);
        }

        dbRequest.onerror = (e) => {
          reject(e);
        }

      });

    });
  }

}