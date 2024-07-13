import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE,
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(process.cwd(), "index.html"),
          auth: path.resolve(process.cwd(), "auth/index.html"),
        },
      },
    },
  };
});
