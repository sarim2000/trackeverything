import { ConvexError, v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";
import { getUserId } from "../utils";



export const getAiSuggestedBooks = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    const suggestedBooks = await ctx.db.query('aiSuggestedBooks').filter(q => q.eq(q.field('userId'), userId)).unique();
    return suggestedBooks;
  }
})
