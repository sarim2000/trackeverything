import { userProfileSchema } from './../schema';
import { ConvexError, v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";
import { getUserId } from "../utils";


export const getUserProfile = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    const userProfileSchema = await ctx.db.query('userProfile').filter(q => q.eq(q.field('userId'), userId)).unique();


    return userProfileSchema;
  }
})