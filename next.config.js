/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compatibilidade com Windows e Linux
  output: 'standalone',
  
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
    esmExternals: true,
  },
  
  // Otimização de imagens com suporte cross-platform
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Garante compatibilidade com Windows
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler Emotion com compatibilidade melhorada
  compiler: {
    emotion: true,
    styledComponents: false,
  },

  // Headers para garantir renderização correta em todos os navegadores
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Webpack config para melhor suporte cross-platform
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          mui: {
            name: 'mui',
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          emotion: {
            name: 'emotion',
            test: /[\\/]node_modules[\\/]@emotion[\\/]/,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      },
    }
    return config
  },

  // Melhor suporte para SVG e fontes em Windows
  staticPageGenerationTimeout: 120,
  
  // Garantir que publicRuntimeConfig funciona em ambos os SO
  publicRuntimeConfig: {
    basePath: '',
  },
  
  assetPrefix: process.env.ASSET_PREFIX || '',

  // Configuração de logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig