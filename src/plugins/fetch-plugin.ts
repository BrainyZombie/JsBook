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
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cacheKey = args.path;
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          cacheKey
        );

        if (cachedResult) {
          return cachedResult;
        } else {
          return null;
        }
      });
      build.onLoad({ filter: /(.css$)/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
            const style = document.createElement('style');
            style.innerText = "${escaped}";
            document.head.appendChild(style);
        `.trim();
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        const cacheKey = args.path;
        await fileCache.setItem(cacheKey, result);
        return result;
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        const cacheKey = args.path;
        await fileCache.setItem(cacheKey, result);
        return result;
      });
    },
  };
};
