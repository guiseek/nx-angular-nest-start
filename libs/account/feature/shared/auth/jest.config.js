module.exports = {
  name: 'account-feature-shared-auth',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/account/feature/shared/auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
