import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  base: '/csus/',
  envDir: './src',
  test: {
    globals: true,
    environment: 'jsdom',
  },
};
