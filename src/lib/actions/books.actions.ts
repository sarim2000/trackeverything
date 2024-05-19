"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserInfo } from "./user.actions";


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BOOK_COLLECTION_ID: BOOK_COLLECTION_ID,
} = process.env;

export async function sumbitBooks({title, description, cover_img}: {title: string, description: string, cover_img: string}) {
    const { database } = await createAdminClient();
    const { account } = await createSessionClient();
    const result = await account.get();
    const userInfo = await getUserInfo({ userId: result.$id });
    const bookResponse = await database.createDocument(
        DATABASE_ID!,
        BOOK_COLLECTION_ID!,
        ID.unique(),
        {
            title: title,
            description: description,
            cover_img: cover_img,
            users: [userInfo.$id],
        }
    )
    console.log("🚀 ~ sumbitBooks ~ bookResponse:", bookResponse)
} 
