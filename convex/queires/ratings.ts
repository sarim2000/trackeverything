import { ConvexError, v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";
import { getUserId } from "../utils";


// todo: optional from v not working, look into it later
export const getRatings = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const rating = await ctx.db.query('ratings').filter(q => q.eq(q.field('mediaId'), args.id)).collect()
    const totalRatingsVal = rating.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRatingsVal / rating.length;
    return averageRating;
  } 
})