import { ConvexError, v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";
import { getUserId } from "../utils";


// todo: optional from v not working, look into it later
export const getBooks = query({
    handler: async (ctx) => {
        const userId = await getUserId(ctx);
        const books = await ctx.db.query('books').filter(q => q.eq(q.field('userId'), userId)).collect();

        const booksWithRatings = await Promise.all(books.map(async (book) => {
            const rating = await ctx.db.query('ratings').filter(q => q.eq(q.field('mediaId'), book.id)).unique()
            console.log("🚀 ~ booksWithRatings ~ rating:", rating)
            
            return {...book, rating}
        }))

        return booksWithRatings;
    }
})

export const getBook = query({
    args: {
        id: v.string(),
    },
    handler: async (ctx, { id }) => {
        const userId = await getUserId(ctx);
        const book = await ctx.db.query('books').filter(q => q.and(q.eq(q.field('id'), id), q.eq(q.field('userId'), userId))).unique();
        return book;
    }
})