import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  define: {
    // 解决umd模式下，process报错问题
    "process.env": process.env,
  },
  build: {
    outDir: resolve(__dirname, "lib"),
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      name: "JSONify",
      fileName: (entry: string, fileName: string) => {
        return `${fileName}.${entry}.js`;
      },
      formats: ["es", "umd", "cjs"],
    },
  },
});
