import { ConvexError, v } from "convex/values";
import { mutation, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { getUserId } from "../utils";

export const insertRating = mutation({
  args: { rating: v.number(), mediaId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const existingRating = await ctx.db.query('ratings').filter(q => q.and(q.eq(q.field('mediaId'), args.mediaId), q.eq(q.field('userId'), userId))).unique()

    if (existingRating) {
      await ctx.db.patch(existingRating._id, {
        rating: args.rating,
      })

    }

    else {
      await ctx.db.insert('ratings', {
        rating: args.rating,
        mediaId: args.mediaId,
        userId: userId,
      });
    }
  },
});

