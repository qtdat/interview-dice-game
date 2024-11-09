export default {
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }],
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
