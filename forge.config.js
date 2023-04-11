module.exports = {
  packagerConfig: {
    icon: './src/assets/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-appx',
      config: {
        publisher: 'WTF',
      }
    }
  ],
};
