module.exports = {
  name: 'account-shared-user',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/account/shared/user',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
