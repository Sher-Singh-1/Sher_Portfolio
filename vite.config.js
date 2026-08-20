import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  // GitHub Pages serves project sites from /<repository-name>/.
  // Local development and other hosts continue to use the root path.
  base: process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : '/',
  plugins: [react(), tailwindcss()],
})
