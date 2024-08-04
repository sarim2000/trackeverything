import { ConvexError, v } from "convex/values";
import { mutation, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { getUserId } from "../utils";

export const addBook = mutation({
    args: { title: v.string(), description: v.string(), cover_img: v.string(), id: v.string() },
    handler: async (ctx, args) => {
        const userId = await getUserId(ctx);

        const bookId = await ctx.db.query('books').filter(q => q.and(q.eq(q.field('id'), args.id), q.eq(q.field('userId'), userId))).unique();

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
            userId: userId,
        });

    },
});

