import { defineSchema, defineTable } from 'convex/server';
import { Validator, v } from 'convex/values';

// The users, accounts, sessions and verificationTokens tables are modeled
// from https://authjs.dev/getting-started/adapters#models

export const userSchema = {
  email: v.string(),
  name: v.optional(v.string()),
  emailVerified: v.optional(v.number()),
  image: v.optional(v.string()),
};

export const sessionSchema = {
  userId: v.id('users'),
  expires: v.number(),
  sessionToken: v.string(),
};

export const accountSchema = {
  userId: v.id('users'),
  type: v.union(v.literal('email'), v.literal('oidc'), v.literal('oauth'), v.literal('webauthn')),
  provider: v.string(),
  providerAccountId: v.string(),
  refresh_token: v.optional(v.string()),
  access_token: v.optional(v.string()),
  expires_at: v.optional(v.number()),
  token_type: v.optional(v.string() as Validator<Lowercase<string>>),
  scope: v.optional(v.string()),
  id_token: v.optional(v.string()),
  session_state: v.optional(v.string()),
};

export const verificationTokenSchema = {
  identifier: v.string(),
  token: v.string(),
  expires: v.number(),
};

export const authenticatorSchema = {
  credentialID: v.string(),
  userId: v.id('users'),
  providerAccountId: v.string(),
  credentialPublicKey: v.string(),
  counter: v.number(),
  credentialDeviceType: v.string(),
  credentialBackedUp: v.boolean(),
  transports: v.optional(v.string()),
};

const authTables = {
  users: defineTable(userSchema).index('email', ['email']),
  sessions: defineTable(sessionSchema).index('sessionToken', ['sessionToken']).index('userId', ['userId']),
  accounts: defineTable(accountSchema)
    .index('providerAndAccountId', ['provider', 'providerAccountId'])
    .index('userId', ['userId']),
  verificationTokens: defineTable(verificationTokenSchema).index('identifierToken', ['identifier', 'token']),
  authenticators: defineTable(authenticatorSchema).index('userId', ['userId']).index('credentialID', ['credentialID']),
};

export const bookSchema = {
  title: v.string(),
  description: v.string(),
  cover_img: v.string(),
  id: v.string(),
  userId: v.id('users'),
  author_name: v.string(),
  first_publish_year: v.string(),
};

export const commentSchema = {
  content: v.string(),
  userId: v.id('users'),
  mediaId: v.string(),
  mediaType: v.string(),
};

export const ratingSchema = {
  userId: v.id('users'),
  mediaId: v.string(),
  rating: v.number(),
};

export const aggregatedRatingSchema = {
  mediaId: v.string(),
  totalRatings: v.number(),
  averageRating: v.number(),
  totalUsers: v.number(),
};

export const userProfileSchema = {
  userId: v.id('users'),
  bio: v.optional(v.string()),
  favoriteGenres: v.array(v.string()),
  preferredMediaTypes: v.array(v.string()),
  ageRange: v.optional(v.string()),
  languagePreferences: v.array(v.string()),
};

export const bookSuggestionSchema = {
  title: v.string(),
  author: v.string(),
  reason: v.string(),
  description: v.string(),
};

export const aiSuggestedBooksSchema = {
  books: v.array(v.object(bookSuggestionSchema)),
  userId: v.id('users'),
};


export default defineSchema({
  ...authTables,
  books: defineTable(bookSchema),
  comments: defineTable(commentSchema),
  ratings: defineTable(ratingSchema),
  aggregatedRatings: defineTable(aggregatedRatingSchema),
  userProfile: defineTable(userProfileSchema),
  aiSuggestedBooks: defineTable(aiSuggestedBooksSchema),
  // your other tables
  // or pass `strictTableNameTypes: false`
  // in the second argument argument to `defineSchema`
});
