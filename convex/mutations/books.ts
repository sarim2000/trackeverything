import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";

export const addBook = mutation({
    args: { title: v.string(), description: v.string(), cover_img: v.string(), id: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new ConvexError({
                message: "Unauthenticated call",
                code: "400"
            })
        }
        console.log("identity.subject", identity);
        const userId = await ctx.db.query('users').filter(q => q.eq(q.field('_id'), identity.subject)).unique();
        console.log("🚀 ~ handler: ~ userId:", userId)
        
        if (!userId) {
            throw new ConvexError({
                message: "User not found",
                code: "400"
            })
        }
        
        const bookId = await ctx.db.query('books').filter(q => q.and(q.eq(q.field('id'), args.id), q.eq(q.field('userId'), userId._id))).unique();

        if (bookId) {
            throw new ConvexError({
                message: "Book already exists",
                code: "400"
            })
        }

        await ctx.db.insert('books', {
            id: args.id,
            title: args.title,
            description: args.description,
            cover_img: args.cover_img,
            userId: userId?._id,
        });

    },
});