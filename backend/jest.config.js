export default {
  transform: {
    "^.+\\.jsx?$": "jest-esm-transformer",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx"],
  extensionsToTreatAsEsm: [".jsx"],
  setupFilesAfterEnv: ['./jest.setup.js'],
}
