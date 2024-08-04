import { ConvexError, v } from "convex/values";
import { mutation, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { getUserId } from "../utils";

export const insertRating = mutation({
  args: { rating: v.number(), mediaId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    
    await ctx.db.insert('ratings', {
      rating: args.rating,
      mediaId: args.mediaId,
      userId: userId,
    });
  },
});

