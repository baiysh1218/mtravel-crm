declare global {
  export type Gender = 1 | 2;
  export type UserID = number;
  export type VID = string;

  // fsd required
  declare type RootState = import("../src/app/store").RootState;
  declare type AppDispatch = import("../src/app/store").AppDispatch;
}

export {};
