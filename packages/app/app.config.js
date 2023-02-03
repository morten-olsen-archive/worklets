const pkg = require('./package.json');
const IS_DEV = process.env.APP_VARIANT === 'development';

const name = IS_DEV ? 'Worklets (Dev)' : 'Worklets';
const bundleIdentifier = IS_DEV ? 'pro.mortenolsen.worklets.dev' : 'pro.mortenolsen.worklets';
const icon = IS_DEV ? './assets/icon-dev.png' : './assets/icon.png';
const version = process.env.BUILD_VERSION || pkg.version;

module.exports = {
  name,
  slug: 'worklets',
  version,
  orientation: 'portrait',
  icon,
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/ff4f5882-bc93-4b29-929a-efca0b5f3d1f',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: bundleIdentifier,
  },
  android: {
    package: bundleIdentifier,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'ff4f5882-bc93-4b29-929a-efca0b5f3d1f',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};
