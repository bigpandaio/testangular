module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['ng-scenario'],
    files: [
      'test/e2e/**/*.js'
    ],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['dots'],

    // web server port
    port: 9877,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: process.env.TRAVIS ? 'Firefox' : ['Chrome', 'Firefox', 'Safari'],

    urlRoot : '/__e2e/',
    proxies: {
      '/': 'http://localhost:8000/'
    },


    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 5000ms
    // CLI --report-slower-than 5000
    reportSlowerThan: 5000,

    plugins: [
      // Launchers
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',

      //Framework
      'karma-ng-scenario'
    ]


  })
}


