import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    // base: `/${env.VITE_GITHUB_REPO}`,
    build: {
      rollupOptions: {
        input: { main: path.resolve(process.cwd(), "index.html") },
        auth: { main: path.resolve(process.cwd(), "auth/index.html") },
      },
    },
  };
});
