import { ConvexError, v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";
import { getUserId } from "../utils";



export const getAiSuggestedBooks = query({
  args: {
    typeOfSuggestion: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    const suggestedBooks = await ctx.db.query('aiSuggestedBooks').filter(q => q.and(q.eq(q.field('userId'), userId), q.eq(q.field('typeOfSuggestion'), args.typeOfSuggestion))).unique();
    return suggestedBooks;
  }
})
