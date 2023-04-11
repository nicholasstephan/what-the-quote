module.exports = {
  packagerConfig: {
    icon: './src/assets/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-appx',
      config: {
        publisher: 'CN=F0D59367-F8E9-4DE8-865A-2D183D96ACC7',
      }
    }
  ],
};
