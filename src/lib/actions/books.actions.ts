'use server';

import { createAdminClient, createSessionClient } from '@/lib/appwrite';
import { ID, Query } from 'node-appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserInfo } from './user.actions';

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
    const bookExists: any = await database.getDocument(DATABASE_ID!, BOOK_COLLECTION_ID!, id);
    console.log('🚀 ~ sumbitBooks ~ bookExists:', bookExists.users);
    if (bookExists) {
      const users = bookExists.users.includes(userInfo.$id) ? bookExists.users : [...bookExists.users, userInfo.$id];
      console.log('🚀 ~ sumbitBooks ~ users:', users);
      await database.updateDocument(DATABASE_ID!, BOOK_COLLECTION_ID!, id, {
        users: users,
      }).then((response) => {
        console.log('🚀 ~ sumbitBooks ~ response:', response);
      });
    }
    else {
      const bookResponse = await database.updateDocument(
        DATABASE_ID!,
        BOOK_COLLECTION_ID!,
        id,
        {
          users: [userInfo.$id],
        }
      );
    }

    return {
      type: 'success',
      message: 'Book added to your library',
    };
  } catch (error) {
    return {
      type: 'error',
      message: 'Error adding book to your library',
    };
  }
}
