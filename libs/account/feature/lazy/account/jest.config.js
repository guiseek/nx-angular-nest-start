module.exports = {
  name: 'account-feature-lazy-account',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/account/feature/lazy/account',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
