"use server";

import { api } from "@src/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { auth } from "@/auth";



export async function postComment(formData: FormData) {
  const session = await auth();
  const rawFormData = {
    comment: formData.get('comment'),
    id: formData.get('id'),
    type: formData.get('type'),
  };

  try {
    await fetchMutation(
      api.mutations.comments.createComment,
      {
        content: formData.get('comment') as string,
        mediaId: rawFormData.id as string,
        mediaType: rawFormData.type as string,
      },
      { token: session?.convexToken }
    );
    return { message: 'Comment created' };
  } catch (error) {
    throw new Error('Failed to create comment');
  }
}
