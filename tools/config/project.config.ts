import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';
import { ExtendPackages } from './seed.config.interfaces';
import { argv } from 'yargs';
import { proxyHandle } from '../utils/seed/server';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**'
  ];

  APP_PROXY = 'proxy';

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    /**
     * The BrowserSync configuration of the application.
     * The default open behavior is to open the browser. To prevent the browser from opening use the `--b`  flag when
     * running `npm start` (tested with serve.dev).
     * Example: `npm start -- --b`
     */
    let APP_BASE = this.APP_BASE || '/';
    this.PLUGIN_CONFIGS['browser-sync'] = {
      middleware: [
        require('connect-history-api-fallback')({
          index: `${APP_BASE}index.html`
        }),
        {
          route: APP_BASE + this.APP_PROXY,
          handle: proxyHandle
        }
      ],
      port: this.PORT,
      startPath: APP_BASE,
      open: argv['b'] ? false : true,
      injectChanges: false,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        routes: {
          [`${APP_BASE}${this.APP_SRC}`]: this.APP_SRC,
          [`${APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${APP_BASE}node_modules`]: 'node_modules',
          [`${APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    };

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'}
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true},
      {src: 'font-awesome/css/font-awesome.css', inject: true}
    ];

    // Configure global loader plugins
    this.addMapConfig({
      name: 'json',
      config: 'systemjs-plugin-json/json.js' 
    });

    // Configure loader extensions
    this.addMetaConfig({
      name: '*.json',
      config: {
        loader: 'json'
      }
    });

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. lodash)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // }];
    //
    // or
    //
    let additionalPackages: ExtendPackages[] = [];
    //
    // additionalPackages.push({
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // });
    //

    additionalPackages.push({
      name: 'firebase',
      path: `${this.APP_BASE}node_modules/firebase/firebase.js`
    });

    additionalPackages.push({
      name: '@ngrx/store-log-monitor',
      path: `${this.APP_BASE}node_modules/@ngrx/store-log-monitor/bundles/store-log-monitor.umd.js`
    });

    additionalPackages.push({
      name: 'moment',
      packageMeta: {
        main: 'moment.js'
      }
    });

    this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

  addMapConfig(options: any) {
    if (!this.SYSTEM_CONFIG_DEV.map) {
      this.SYSTEM_CONFIG_DEV.map = {};
    }
    if (!this.SYSTEM_BUILDER_CONFIG.map) {
      this.SYSTEM_BUILDER_CONFIG.map = {};
    }
    this.SYSTEM_CONFIG_DEV.map[options.name] = options.config;
    this.SYSTEM_BUILDER_CONFIG.map[options.name] = options.config;
  }

  addMetaConfig(options: any) {
    if (!this.SYSTEM_CONFIG_DEV.meta) {
      this.SYSTEM_CONFIG_DEV.meta = {};
    }
    if (!this.SYSTEM_BUILDER_CONFIG.meta) {
      this.SYSTEM_BUILDER_CONFIG.meta = {};
    }
    this.SYSTEM_CONFIG_DEV.meta[options.name] = options.config;
    this.SYSTEM_BUILDER_CONFIG.meta[options.name] = options.config;
  }

}
