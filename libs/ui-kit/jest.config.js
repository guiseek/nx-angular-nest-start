module.exports = {
  name: 'ui-kit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-kit',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
