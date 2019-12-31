module.exports = {
  presets: [
    [
      'babel-preset-gatsby-package',
      {
        browser: true,
        debug: process.env.NODE_ENV === 'development',
        nodeVersion: '12.13'
      },
    ],
  ],
};
