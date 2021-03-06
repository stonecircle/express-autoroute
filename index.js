const path = require('path');

const loader = require('./lib/loader');

module.exports = function expressAutoroute(app, options) {
  // is a winston instance is passed as the second argument it will be used for autoroute logging
  // otherwise it will use a 'clean' winston instance
  if (!options.logger || (!(options.logger.debug && typeof options.logger.debug === 'function'))) {
    // eslint-disable-next-line global-require,no-param-reassign
    options.logger = require('winston');
    options.logger.debug('using custom logger');
  } else {
    options.logger.debug('using specified logger');
  }

  if (!options.routesDir && !options.routeFile) {
    // eslint-disable-next-line no-param-reassign
    options.routesDir = path.join(process.cwd(), 'routes');
  }

  if (options.routesDir) {
    options.logger.debug('Loading routes directory', {
      dir: options.routesDir,
    });

    loader.loadDirectory(options.routesDir, '', app, options);
  } else if (options.routeFile) {
    options.logger.debug('Loading route file', {
      file: options.routeFile,
    });
    loader.loadFile(options.routeFile, options.prefix || '', app, options);
  }
};
