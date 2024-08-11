import { ConvexError, v } from "convex/values";
import { mutation, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { getUserId } from "../utils";

export const addUserProfile = mutation({
  args: { 
    bio: v.string(),
    favoriteGenres: v.array(v.string()),
    preferredMediaTypes: v.array(v.string()),
    ageRange: v.string(),
    languagePreferences: v.array(v.string()),
   },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const userProfile = await ctx.db.query('userProfile').filter((q) => q.eq(q.field('userId'), userId)).unique();

    if (userProfile) {
      await ctx.db.patch(userProfile._id, {
        bio: args.bio,
        favoriteGenres: args.favoriteGenres,
        preferredMediaTypes: args.preferredMediaTypes,
        ageRange: args.ageRange,
        languagePreferences: args.languagePreferences,
      });

      return userProfile;
    }

    await ctx.db.insert('userProfile', {
      bio: args.bio,
      favoriteGenres: args.favoriteGenres,
      preferredMediaTypes: args.preferredMediaTypes,
      ageRange: args.ageRange,
      languagePreferences: args.languagePreferences,
      userId: userId,
    });
  },
});

