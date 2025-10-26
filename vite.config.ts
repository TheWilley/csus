import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default {
  plugins: [react(), tailwindcss()],
  base: '/csus/',
  envDir: './src',
  test: {
    globals: true,
    environment: 'jsdom',
  },
};
