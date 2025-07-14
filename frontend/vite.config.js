import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ DO NOT include tailwindcss here (explained below)
export default defineConfig({
  base: '/', // ✅ tells Vite to use root path — required for Vercel!
  plugins: [react()],
});
