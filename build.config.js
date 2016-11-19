/* build.config.js */

module.exports = {
  // overrides
  sourceMaps: false,
  // override NODE_ENV=production
  // productionMode: true,

  // apply optimize-js (default: true)
  optimizeJS: true,

  // app source root directory relative to this file
  root: 'www',

  // destination remapping/replace
  // e.g. <src>: <dest>
  destMap: {
    'www/': 'build/',
  },

  // clean settings
  clean: {
    // NOTE: Get this righ or you will nuke your code!!!
    root: 'build',
    ignore: [
      'fonts',
      'bower_components',
    ],
  },

  // paths to search for modules
  // 'required' by client build system
  node_modules: [
    'node_modules',
  ],

  // ignored by bundler
  ignored: [
    '.git',
    '**/.git',
    '_*',
    'node_modules',
  ],

  // the namespace to put bundles in
  appNamespace: '_site',

  // modules ID's to keep external to bundles (i.e. that don't rollup) in the following formats,
  //  where:
  //    resulting global-name is converted to camleCase e,g,: glob-name -> globName
  //    glob-expressions are relitive to config.root and result in basename less extname
  //    replace array is argument to string.replace.apply
  //
  //  Formats:
  //   '<module-id>' or
  //   '<glob-expression>' or
  //   { id: '<module-id>', global: '<global-name>' } or
  //   { glob: '<glob-expression>', with: '<regexp-string>', id: '<replace>' } or
  //   { glob: '<glob-expression>', with: '<regexp-string>', id: '<replace>', global: '<replace>' }
  externals: [
    'web-frame',
    // { glob: '**/*-bundle.es6', with: '.*[\\/](.*)-bundle\\.es6', id: '$1' },
    { glob: '**/*-bundle.es6', replace: ['-bundle', ''] },
    // { id: 'example', global: 'my-example' },
    // { id: 'core', global: 'app-core' },
  ],

  // extensions to use for node style require when bundling
  extensions: ['.es6', '.js', '.json'],

  // builds
  builds: {
    bundles: {
      // remove '-bundle' from bundle's dest file name
      destMap: {
        '-bundle.js': '.js',
      },
      // paths to search for bundle entry files
      paths: {
        // NOTE: you can cherrypick bundles to change their output bundle format
        // i.e. 'amd', 'cjs', 'es', 'iife' or 'umd' (default: 'iife')
        // in this case we just want it bundled - no babel
        '**/bundles/site-bootstrap-bundle.es6': {
          bundleFormat: 'cjs',
          // don't apply rollup-plugin-commonjs
          commonJs: false,
          // don't apply babel transform here
          babel: false,
        },
        // add deps based on this entry's globbed files
        // e.g.: file -> '<search>': '<replace>' -> glob expression to add as dep
        '**/*-bundle.es6': {
          // given foo/bar/baz-bundle.es6 - add deps like -> foo/bar/baz/**/*.es6
          deps: { '(.*)[\\/](.*)-bundle\\.es6': '$1/$2/**/*.es6' },
        },
      },
      // babel config
      babel: {
        babelrc: false,
        sourceMaps: false,
        presets: [['browser', { modules: false }]],
      },
    },

    html: {
      // inlining override (otherwise based on productionMode)
      inlineScript: true,
      // paths to search for files
      paths: {
        '**/*-*.html': {
          // add deps based on this entry's globbed files
          // e.g.: file -> '<search>': '<replace>' -> glob expression to add as dep
          deps: {
            // given foo/bar-element/bar-element.html - add deps like -> foo/bar-element/**/*.es6
            '(.*)[\\/].*\\.html': '$1/**/*.es6',
          },
        },
        '**/*.html': {},
      },
      // babel config
      babel: {
        babelrc: false,
        sourceMaps: false,
        presets: [['browser', { modules: false }]],
      },
    },

    files: {
      // additional ignore list
      ignored: [
        '**/bundles',
      ],
      // paths to search for files
      paths: {
        '**/*.js': {},
        '**/*.png': {},
        '**/*.jpg': {},
        '**/*.ico': {},
        'robots.txt': {},
        'manifest.json': {},
      },
    },

    css: {
      // additional ignore list
      ignored: [
        '**/*.inc.css',
      ],
      // paths to search for files
      paths: {
        '**/*.css': {},
      },
    },
  },
};
