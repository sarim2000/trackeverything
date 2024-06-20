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

// {
//     title: 'Counting by 7s',
//     cover_i: 'https://covers.openlibrary.org/b/id/7590471-L.jpg',
//     key: 'OL17444101W',
//     first_sentence: "Willow Chance is a twelve-year-old genius, obsessed with nature and diagnosing medical conditions, who finds it comforting to count by 7s. It has never been easy for her to connect with anyone other than her adoptive parents, but that hasn't kept her from leading a quietly happy life . . . until now.\r\n" +
//       "Suddenly Willow's world is tragically changed when her parents both die in a car crash, leaving her alone in a baffling world. The triumph of this book is that it is not a tragedy. This extraordinarily odd, but extraordinarily endearing, girl manages to push through her grief. Her journey to find a fascinatingly diverse and fully believable surrogate family is a joy and a revelation to read.",
//     '$id': '666ecb15002032c6808a',
//     '$createdAt': '2024-06-16T11:23:02.178+00:00',
//     '$updatedAt': '2024-06-16T11:23:02.178+00:00',
//     '$permissions': [],
//     users: [
//       {
//         name: 'admin',
//         email: 'admin@gmail.com',
//         userId: '66532e77003bebeb5ed8',
//         '$id': '66532e790039fc0dccb1',
//         '$createdAt': '2024-05-26T12:43:38.677+00:00',
//         '$updatedAt': '2024-05-26T12:43:38.677+00:00',
//         '$permissions': [],
//         '$databaseId': '6649fcbf003408020de8',
//         '$collectionId': '6649ff32003a42cc5f30'
//       }
//     ],
//     '$databaseId': '6649fcbf003408020de8',
//     '$collectionId': '664a2cbd003b753b9534'
//   }


export async function getMyBooks(id: string) {
    try {
        const { database } = await createAdminClient();
        const { account } = await createSessionClient();

        const result = await database.getDocument(DATABASE_ID || "", BOOK_COLLECTION_ID || "", id);
        return {
            title: result.title,
            cover_i: result.cover_i,
            key: result.key,
            first_sentence: result.first_sentence,
            id: result.$id,
        };
    } catch (error) {
        console.error(error);
    }
}