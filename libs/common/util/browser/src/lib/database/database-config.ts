// export const Config = {
//   name: 'voicememo',
//   version: 1,
//   stores: {
//     'MemoModel': {
//       properties: {
//         autoIncrement: true,
//         keyPath: 'url'
//       },
//       indexes: {
//         time: { unique: true }
//       }
//     },
//     'AppModel': {
//       deleteOnUpgrade: true,
//       properties: {
//         autoIncrement: true
//       }
//     }
//   }
// };
export interface DBConfig {
  name: string;
  version: number;
  stores: Stores;
}

export interface Stores {
  [k: string]: Model;
}

export interface Model {
  deleteOnUpgrade: boolean;
  properties: ModelProperties;
  indexes: Indexes;
}

export interface MemoModel {
  properties: ModelProperties;
}

export interface Indexes {
  time: Time;
}

export interface Time {
  unique: boolean;
}

export interface ModelProperties {
  autoIncrement: boolean;
  keyPath: string;
}
