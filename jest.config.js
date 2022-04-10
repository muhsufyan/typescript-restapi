/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // format file test yg akan dijalankan, yg berakhir .test.ts akan dijlnkan as test
  testMatch: ["**/**/*.test.ts"],
  verbose:true,
  // stlh selesai test auto keluar/exit
  forceExit:true,
  clearMocks: true, //mocking untuk test
  resetMocks: true,
  restoreMocks: true,
};