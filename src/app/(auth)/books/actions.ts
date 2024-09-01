'use server';

export default async function getBooks(params: {
  title?: string;
  author?: string;
  subject?: string;
  place?: string;
  person?: string;
  publisher?: string;
  publish_year?: string;
}) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    queryParams.append('limit', '10');

    const res = await fetch(`http://openlibrary.org/search.json?${queryParams.toString()}`);
    console.log(res);
    
    const data = await res.json();
    const { docs } = data;

    if (docs) {
      const newBooks = docs
        .slice(0, 20)
        .map(
          (book: {
            key: string;
            author_name: string[];
            cover_i: number;
            edition_count: number;
            first_publish_year: number;
            title: string;
            first_sentence: string[];
          }) => {
            const { key, author_name, cover_i, edition_count, first_publish_year, title, first_sentence } = book;

            return {
              key,
              author_name: author_name?.[0] || 'Unknown',
              cover_i,
              edition_count,
              first_publish_year,
              title,
              first_sentence: first_sentence?.[0] || '',
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
        author_name: 'No author',
        cover_i: 0,
        edition_count: 0,
        first_publish_year: 0,
        title: 'No title',
        first_sentence: '',
      },
    ];
  }
}
