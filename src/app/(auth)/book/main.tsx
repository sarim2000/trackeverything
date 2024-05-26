import { Book } from '@/lib/types';
import getBooks from './actions';
import BookCardComponent from '@/components/ui/bookcards';
import { Flex } from '@mantine/core';

export default async function BookLayout({ query }: { query: string }) {
  const books = (await getBooks(query)) as Book[];

  return (
    <Flex gap={'lg'} wrap={'wrap'} justify={'center'}>
      {books.map((book: Book, id: number) => {
        return <BookCardComponent key={id} book={book} />;
      })}
    </Flex>
  );
}
