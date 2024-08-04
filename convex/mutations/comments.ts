import { v } from "convex/values";
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
        console.log("🚀 ~ handler ~ userId:", userId)
        const comment = await ctx.db.insert('comments', {
            content,
            mediaId,
            mediaType,
            userId,
        });
        return comment;
    }
})