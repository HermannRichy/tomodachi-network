const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Les styles viennent du design system partagé (packages/design-tokens).
// inlineRem 16 : mêmes espacements que le web (p-4 = 16 px).
module.exports = withNativeWind(config, { input: './src/global.css', inlineRem: 16 });
