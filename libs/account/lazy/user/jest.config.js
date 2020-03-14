module.exports = {
  name: 'account-lazy-user',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/account/lazy/user',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
