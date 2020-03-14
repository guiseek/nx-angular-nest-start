module.exports = {
  name: 'account-feature-lazy-company',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/account/feature/lazy/company',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
