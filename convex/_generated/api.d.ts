/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as authAdapter from "../authAdapter.js";
import type * as http from "../http.js";
import type * as mutations_aiSuggestedBook from "../mutations/aiSuggestedBook.js";
import type * as mutations_books from "../mutations/books.js";
import type * as mutations_comments from "../mutations/comments.js";
import type * as mutations_profile from "../mutations/profile.js";
import type * as mutations_ratings from "../mutations/ratings.js";
import type * as queires_aiSuggestedBook from "../queires/aiSuggestedBook.js";
import type * as queires_books from "../queires/books.js";
import type * as queires_comments from "../queires/comments.js";
import type * as queires_profile from "../queires/profile.js";
import type * as queires_ratings from "../queires/ratings.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  authAdapter: typeof authAdapter;
  http: typeof http;
  "mutations/aiSuggestedBook": typeof mutations_aiSuggestedBook;
  "mutations/books": typeof mutations_books;
  "mutations/comments": typeof mutations_comments;
  "mutations/profile": typeof mutations_profile;
  "mutations/ratings": typeof mutations_ratings;
  "queires/aiSuggestedBook": typeof queires_aiSuggestedBook;
  "queires/books": typeof queires_books;
  "queires/comments": typeof queires_comments;
  "queires/profile": typeof queires_profile;
  "queires/ratings": typeof queires_ratings;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
