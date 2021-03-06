module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: 'server/**/*.js',
        mutated: true,
        included: false
      },
      'test/**/*.js'
    ],
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: [],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest'
  });
};
