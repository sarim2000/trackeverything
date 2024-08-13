export type Book = {
  key: string;
  author_name: string;
  cover_i: string;
  edition_count: string;
  first_publish_year: string;
  title: string;
  first_sentence: string[];
};

export type Rating = {
  mediaId: string,
  rating: number,
  userId: string,
  _creationTime: number,
  _id: string,
}



export type MyBook = {
  title: string,
  description: string,
  cover_img: string,
  id: string,
  userId: string,
  author_name: string,
  first_publish_year: string,
  rating: number,
};
