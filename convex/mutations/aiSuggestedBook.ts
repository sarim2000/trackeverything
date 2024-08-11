import { ConvexError, v } from "convex/values";
import { mutation, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { getUserId } from "../utils";
import { aiSuggestedBooksSchema, bookSuggestionSchema } from "../schema";

export const addAiSuggestedBooks = mutation({
  args: {books: aiSuggestedBooksSchema.books},
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const existingAiSuggestedBooks = await ctx.db.query('aiSuggestedBooks').filter(q => q.eq(q.field('userId'), userId)).collect();

    if (existingAiSuggestedBooks.length > 0) {
      await ctx.db.patch(existingAiSuggestedBooks[0]._id, {
        books: args.books,
      });
      return;
    }

    await ctx.db.insert('aiSuggestedBooks', {
      books: args.books,
      userId: userId,
    });
  },
});

