import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const env = loadEnv(mode, cwd);

  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(cwd, "index.html"),
          auth: path.resolve(cwd, "auth/index.html"),
        },
      },
    },
  };
});
