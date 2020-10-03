module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testMatch: ['**/src/**/*.spec.ts'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
