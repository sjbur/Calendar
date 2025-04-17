import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['@testing-library/jest-dom'],
    coverage: {
      exclude: [
        'postcss.config.js',
        'eslint.config.js',
        'tailwind.config.js',
        'vitest.setup.ts',
        'vitest.config.ts',
        'vitest.workspace.ts',
        'vite.config.ts',
        'src/app/main.tsx',
        '.storybook',
        'dist',
        '**/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
}); 