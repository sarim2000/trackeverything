import { ConvexError, v } from "convex/values";
import { QueryCtx } from "./_generated/server";

export async function getUserId(ctx: QueryCtx) {
    const identity = await ctx.auth.getUserIdentity();


    if (identity === null) {
        throw new ConvexError({
            message: "Unauthenticated call",
            code: "400"
        })
    }
    const userId = await ctx.db.query('users').filter(q => q.eq(q.field('_id'), identity.subject)).unique();

    if (!userId) {
        throw new ConvexError({
            message: "User not found",
            code: "400"
        })
    }
    return userId._id;
}
