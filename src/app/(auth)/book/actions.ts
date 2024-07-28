'use server';

export default async function getBooks(name: string) {
  try {
    const res = await fetch(`http://openlibrary.org/search.json?title=${name}&limit=10`);
    const data = await res.json();
    const { docs } = data;

    if (docs) {
      const newBooks = docs
        .slice(0, 20)
        .map(
          (book: {
            key: string;
            author_name: string;
            cover_i: string;
            edition_count: string;
            first_publish_year: string;
            title: string;
            first_sentence: string[];
          }) => {
            const { key, author_name, cover_i, edition_count, first_publish_year, title, first_sentence } = book;

            return {
              key,
              author_name,
              cover_i,
              edition_count,
              first_publish_year,
              title,
              first_sentence,
            };
          }
        );

      return newBooks;
    }
  } catch (e) {
    console.log(e);
    return [
      {
        key: '0',
        author_name: ['No author'],
        cover_i: '0',
        edition_count: 0,
        first_publish_year: 0,
        title: 'No title',
      },
    ];
  }
}
