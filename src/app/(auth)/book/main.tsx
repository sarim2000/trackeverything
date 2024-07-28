import BookCardComponent from '@/components/ui/bookcards';
import type { Book } from '@/lib/types';
import { Flex } from '@mantine/core';
import getBooks from './actions';

export default async function BookLayout({ query }: { query: string }) {
  const books = (await getBooks(query)) as Book[];

  return (
    <Flex gap={'lg'} wrap={'wrap'} justify={'center'}>
      {books.map((book: Book) => {
        return <BookCardComponent key={book.key} book={book} />;
      })}
    </Flex>
  );
}
