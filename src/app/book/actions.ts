"use server";
import { unstable_noStore as noStore } from "next/cache";

export default async function getBooks(name: string) {
  noStore();
  // delay for 20 sec
  try {
    const res = await fetch(`http://openlibrary.org/search.json?title=${name}`);
    const data = await res.json();
    const { docs } = data;

    if (docs) {
      const newBooks = docs
        .slice(0, 20)
        .map(
          (book: {
            key: any;
            author_name: any;
            cover_i: any;
            edition_count: any;
            first_publish_year: any;
            title: any;
          }) => {
            const {
              key,
              author_name,
              cover_i,
              edition_count,
              first_publish_year,
              title,
            } = book;

            return {
              key,
              author_name,
              cover_i,
              edition_count,
              first_publish_year,
              title,
            };
          }
        );
      return newBooks;
    }
  } catch (e) {
    console.log(e);
    return [
      {
        key: "0",
        author_name: ["No author"],
        cover_i: "0",
        edition_count: 0,
        first_publish_year: 0,
        title: "No title",
      },
    ];
  }
}
