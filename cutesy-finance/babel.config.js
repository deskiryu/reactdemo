// Basic Babel configuration used by Expo to transpile JavaScript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
