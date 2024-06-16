"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BOOK_COLLECTION_ID: BOOK_COLLECTION_ID,
} = process.env;


export async function getMyBooks(id: string) {
    try {
        const { database } = await createAdminClient();
        const { account } = await createSessionClient();

        const result = await database.getDocument(DATABASE_ID || "", BOOK_COLLECTION_ID || "", id);
        return result;
    } catch (error) {
        console.error(error);
    }
}