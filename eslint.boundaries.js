import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },

    "boundaries/elements": [
      {
        type: "app",
        pattern: "./src/app",
      },
      {
        type: "features",
        pattern: "./src/features/*",
      },
      {
        type: "shared",
        pattern: "./src/shared",
      },
    ],
  },
  rules: {
    "boundaries/dependencies": [
      2,
      {
        default: "allow",
        rules: [
          {
            from: { type: "shared" },
            disallow: {
              to: {
                type: ["app", "features"],
              },
            },
            message:
              "The module of the underlying layer (${file.type}) cannot import the module of the overlying layer (${dependency.type})",
          },
          {
            from: { type: "features" },
            disallow: {
              to: {
                type: ["app"],
              },
            },
            message:
              "The module of the underlying layer (${file.type}) cannot import the module of the overlying layer (${dependency.type})",
          },
          {
            to: { type: "features", internalPath: "!{index.(ts|tsx),*.page.tsx}" },
            disallow: {
              from: { type: "*" },
            },
            message:
              "The module (${file.type}) must be imported via the public API. Direct import from ${dependency.source} is prohibited",
          }
        ],
      },
    ],
  },
};
