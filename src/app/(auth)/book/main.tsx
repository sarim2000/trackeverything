import { Book } from '@/lib/types';
import getBooks from './actions';
import BookCardComponent from '@/components/ui/bookcards';

export default async function BookLayout({ query }: { query: string }) {
  let books = (await getBooks(query)) as Book[];

  return <BookCardComponent books={books} />;
}
