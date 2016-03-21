import * as Babel from 'babel-core';

/**
 * Parses plugin names and presets from the specified options.
 */
function processOptions(options) {
  // Parse preset names
  const presets = (options.presets || []).map(presetName => {
    if (typeof presetName === 'string') {
      var preset = availablePresets[presetName];
      if (!preset) {
        throw new Error(`Invalid preset specified in Babel options: "${presetName}"`);
      }
      return preset;
    } else {
      // Could be an actual preset module
      return presetName;
    }
  });

  // Parse plugin names
  const plugins = (options.plugins || []).map(pluginName => {
    if (typeof pluginName === 'string') {
      var plugin = availablePlugins[pluginName];
      if (!plugin) {
        throw new Error(`Invalid plugin specified in Babel options: "${pluginName}"`);
      }
      return plugin;
    } else {
      // Could be an actual plugin module
      return pluginName;
    }
  });

  return {
    ...options,
    presets,
    plugins,
  }
}

export function transform(code, options) {
  return Babel.transform(code, processOptions(options));
}

export function transformFromAst(ast, code, options) {
  return Babel.transformFromAst(code, processOptions(options));
}

// All the plugins we should bundle
export const availablePlugins = {
  'blocks': require('babel-plugin-blocks').default
};

// All the presets we should bundle
export const availablePresets = {
};

export const version = Babel.version;
