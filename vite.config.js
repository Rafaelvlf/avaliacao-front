import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em desenvolvimento (npm run dev), tudo que comeca com /api vai para o back-end.
// Ex.: /api/avaliacoes -> http://localhost:8080/avaliacoes
// Para testar o front local contra o back da AWS, troque o target por http://SEU_IP:8080
// Em producao (Vercel) quem faz esse papel e o arquivo vercel.json.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://44.223.105.132:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
