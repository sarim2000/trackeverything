"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		return null;
	}
}

export const getUserInfo = async ({ userId }: { userId: string }) => {
	try {
		const { database } = await createAdminClient();

		const user = await database.listDocuments(
			DATABASE_ID || "",
			USER_COLLECTION_ID || "",
			[Query.equal("userId", userId)],
		);

		return parseStringify(user.documents[0]);
	} catch (error) {
		console.log(error);
	}
};

export async function signUpWithEmail(formData: {
	email: string;
	password: string;
	name: string;
}) {
	const email = formData.email;
	const password = formData.password;
	const name = formData.name;

	try {
		const { account, database } = await createAdminClient();
		const newUserAccount = await account.create(
			ID.unique(),
			email,
			password,
			name,
		);

		if (!newUserAccount) throw new Error("Error creating user");

		const newUser = await database.createDocument(
			DATABASE_ID || "",
			USER_COLLECTION_ID || "",
			ID.unique(),
			{
				name: name,
				email: email,
				userId: newUserAccount.$id,
			},
		);
		const session = await account.createEmailPasswordSession(email, password);

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		redirect("/homexs");
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				user: null,
			};
		}
		return {
			success: false,
			message: "An unknown error occurred",
			user: null,
		};
	}
}

export async function signInWithEmail(formData: {
	email: string;
	password: string;
}) {
	try {
		const { account } = await createAdminClient();
		const session = await account.createEmailPasswordSession(
			formData.email,
			formData.password,
		);

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		redirect("/home");
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				user: null,
			};
		}
		return {
			success: false,
			message: "An unknown error occurred",
			user: null,
		};
	}
}

export const logoutAccount = async () => {
	try {
		const { account } = await createSessionClient();

		cookies().delete("appwrite-session");

		await account.deleteSession("current");
	} catch (error) {
		return null;
	}
};
