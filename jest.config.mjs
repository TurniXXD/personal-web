import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const pnpmPackagesToTransform = [];

const pnpmTransformPatterns = pnpmPackagesToTransform.length
  ? [
      `<rootDir>/node_modules/.pnpm/(?!(?:${pnpmPackagesToTransform
        .map((packageName) => packageName.replace("/", "\\+"))
        .join("|")})@)`,
      `node_modules/(?!.pnpm|${pnpmPackagesToTransform
        .map((packageName) => packageName.replace("/", "\\/"))
        .join("|")})`,
    ]
  : ["/node_modules/", "<rootDir>/node_modules/.pnpm/"];

const customJestConfig = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: [
    "<rootDir>/**/__tests__/**/*.test.ts",
    "<rootDir>/**/__tests__/**/*.test.tsx",
    "<rootDir>/**/*.test.ts",
    "<rootDir>/**/*.test.tsx",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/e2e/",
    "<rootDir>/.next/",
    "<rootDir>/out/",
    "<rootDir>/dist.next/",
    "<rootDir>/node_modules/",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp|avif)$":
      "<rootDir>/test/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: pnpmTransformPatterns,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.test.{ts,tsx}",
    "!**/__tests__/**",
  ],
};

export default createJestConfig(customJestConfig);
