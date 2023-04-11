module.exports = {
  packagerConfig: {
    icon: './src/assets/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-appx',
      config: {
        packageName: "WTQ",
        packageDisplayName: "What the Quote",
        packageDescription: "What the Quote do you want",
        packageVersion: "1.0.0.0",
        deploy: false,
        identityName: "7052WonderfulTerrificFant.WhattheQuote",
        publisherDisplayName: "Wonderful Terrific Fantastic",
        publisher: 'CN=F0D59367-F8E9-4DE8-865A-2D183D96ACC7',
      }
    }
  ],
};
