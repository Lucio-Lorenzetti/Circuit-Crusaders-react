const withTM = require('next-transpile-modules')(['@mercadopago/sdk-react']);

module.exports = withTM({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
});