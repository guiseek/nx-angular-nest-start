module.exports = {
  name: 'shared-auth-auth-elements',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/auth/auth-elements',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
