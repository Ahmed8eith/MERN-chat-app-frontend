import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js')
    }
  }
})
