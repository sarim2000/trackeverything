"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";
import { getUserInfo } from "./user.actions";

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
	APPWRITE_BOOK_COLLECTION_ID: BOOK_COLLECTION_ID,
} = process.env;

export async function getBooksByUserId() {
	const { database } = await createAdminClient();
	const { account } = await createSessionClient();
	const result = await account.get();
	const userInfo = await getUserInfo({ userId: result.$id });
	console.log("userinfo", userInfo);
	return userInfo.books;
}

export async function sumbitBooks({
	title,
	description,
	cover_img,
	id,
}: {
	title: string;
	description: string;
	cover_img: string;
	id: string;
}) {
	try {
		const { database } = await createAdminClient();
		const { account } = await createSessionClient();
		const result = await account.get();
		const userInfo = await getUserInfo({ userId: result.$id });
		const bookExists = false

		await database.createDocument(
			DATABASE_ID || "",
			BOOK_COLLECTION_ID || "",
			ID.unique(),
			{
				users: [userInfo.$id],
				title,
				first_sentence: description,
				cover_i: cover_img,
				key: id,
			},
		);


		return {
			type: "success",
			message: "Book added to your library",
		};
	} catch (error) {
		return {
			type: "error",
			message: `Error adding book to your library ${error}`,
		};
	}
}
