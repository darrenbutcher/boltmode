module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_API_URL, // Matched parameters can be used in the destination
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/graphql',
        headers: [
          {
            key: 'mode',
            value: 'same-site',
          },
          {
            key: 'Access-Control-Allow-Origin',
            // value: 'https://app-3000.buildthat.xyz',
            value: 'https://boltmode.buildthat.xyz',
          },
          // {
          //   key: 'x-another-custom-header',
          //   value: 'my other custom header value',
          // },
        ],
      },
      {
        source: '/',
        headers: [
          // {
          //   key: 'Access-Control-Allow-Origin',
          //   value: 'https://app-3000.buildthat.xyz',
          // },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          // {
          //   key: 'Access-Control-Allow-Headers',
          //   value: 'https://app-3000.buildthat.xyz',
          // },
        ],
      },
    ]
  },
}

// source: '/api/proxy/:path*', destination: 'http://localhost:5000/:path*'
