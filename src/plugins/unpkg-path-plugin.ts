import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, async () => {
        return { path: "index.js", namespace: "a" };
      });

      //Handle relative paths in module
      build.onResolve(
        { filter: /^\.+\// },
        async (args: esbuild.OnResolveArgs) => {
          return {
            namespace: "a",
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
          };
        }
      );

      //Handle root file of modulesS
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        const cacheKey = args.path;
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          cacheKey
        );

        if (cachedResult) {
          console.log("Using cached");
          return cachedResult;
        } else {
          console.log("Not Using cached");
        }

        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(cacheKey, result);
        return result;
      });
    },
  };
};
