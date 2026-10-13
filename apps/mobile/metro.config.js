const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Les styles viennent du design system partagé (packages/design-tokens).
module.exports = withNativeWind(config, { input: './src/global.css' });
