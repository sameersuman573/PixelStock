/* eslint-disable no-var */
// Disables the ESLint rule that disallows the use of 'var'.
// This is necessary because 'var' is used to declare global variables in TypeScript.

import { Connection } from "mongoose";
// Imports the Connection type from the mongoose library.

declare global {
  // Declares a global scope extension in TypeScript.
  var mongoose: {
    conn: Connection | null;
    // 'conn' can either be a Connection object from Mongoose or null.
    promise: Promise<Connection> | null;
    // 'promise' can either be a Promise that resolves to a Connection object or null.
  };
}

export {};
// This makes the file a module, which is necessary for the 'declare global' syntax to work.
