import BookCardComponent from '@/components/books/bookcards';
import type { Book } from '@/lib/types';
import { Flex, Text } from '@mantine/core';
import getBooks from './actions';

export default async function BookLayout({ query }: { query: { title: string, author: string, year: string, genre: string } }) {
  const books = (await getBooks(query)) as Book[];
  // const books = [] as Book[]


  if (books.length === 0) {
    return (
      <Flex gap={'lg'} wrap={'wrap'} justify={'center'}>
        <Text>No books found</Text>
      </Flex>
    );
  }

  return (
    <Flex gap={'lg'} wrap={'wrap'} justify={'center'}>
      {books.map((book: Book) => {
        return <BookCardComponent key={book.key} book={book} />;
      })}
    </Flex>
  );
}
