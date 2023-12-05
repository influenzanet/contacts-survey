import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';
import json from "@rollup/plugin-json";

const config = {
  input: [
    "src/**/*.ts"
  ],
  output:
  {
    dir: 'build',
    format: "cjs",
    sourcemap: false,
  },
  plugins: [
    del({
      targets: 'build/*'
    }),
    multiInput({ relative: 'src/' }),
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
  ]
};

export default config;
