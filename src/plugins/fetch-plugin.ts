import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";
import { JsxEmit } from "typescript";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("sfesfe", args.path);
        if (args.path === "index.js") {
          console.log("sfesfe", args.path);
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }
        console.log("sfesfe", args.path);

        const cacheKey = args.path;
        console.log("sfesfe", args.path);
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          cacheKey
        );
        console.log("sfesfe", args.path);

        if (cachedResult) {
          console.log("sfesfe", args.path);
          return cachedResult;
        }
        console.log("sfesfe", args.path);

        const { data, request } = await axios.get(args.path);
        const fileType = args.path.match(/.css$/) ? "css" : "jsx";
        const contents =
          fileType === "css"
            ? `
            const style = document.createElement('style');
            style.innerText = \`${data}\`;
            document.head.appendChild(style);
        `
            : data;
        console.log(contents);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(cacheKey, result);
        return result;
      });
    },
  };
};
