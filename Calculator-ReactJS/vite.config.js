import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Calculator-ReactJS/",
  plugins: [react()],
});
