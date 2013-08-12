module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      '../src/utils.js',
      '../test/lib/chai.js',
      '../test/utils.spec.js'
    ],

    browsers: ['PhantomJS', 'Chrome'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-mocha'
    ]


  })
}


