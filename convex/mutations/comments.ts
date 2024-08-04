import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { getUserId } from "../utils";

export const createComment = mutation({
    args: {
        content: v.string(),
        mediaId: v.string(),
        mediaType: v.string(),
    },
    handler: async (ctx, { content, mediaId, mediaType }) => {
        const userId = await getUserId(ctx);
        const commentAlreadyExists = await ctx.db.query('comments').filter((q) => q.eq(q.field('userId'), userId)).filter((q) => q.eq(q.field('mediaId'), mediaId)).filter((q) => q.eq(q.field('mediaType'), mediaType)).first();
        
        if (commentAlreadyExists) {
            throw new ConvexError({
                message: 'Comment already exists, soon you will be able to edit it',
                
            })
        }

        const comment = await ctx.db.insert('comments', {
            content,
            mediaId,
            mediaType,
            userId,
        });
        return comment;
    }
})