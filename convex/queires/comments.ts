import { v } from "convex/values";
import { query } from "../_generated/server";

export const getComments = query({
    args: {
        id: v.string(),
    },
    handler: async (ctx, { id }) => {
        const comments = await ctx.db.query('comments').filter(q => q.eq(q.field('mediaId'), id)).order('desc').collect();
        const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
            const user = await ctx.db.query('users').filter(q => q.eq(q.field('_id'), comment.userId)).unique();
            
            return { ...comment, user };
        }));
        return commentsWithUsers;
    }
});