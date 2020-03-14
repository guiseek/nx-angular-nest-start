module.exports = {
  name: 'account-feature-lazy-users',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/account/feature/lazy/users',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
