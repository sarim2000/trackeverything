import BookMainComponent from './_components/bookMainComponent';

const URL = 'https://openlibrary.org/works/';
const baseURL = 'https://openlibrary.org';

export default async function Page({ params }: { params: { slug: string } }) {
  let data, authorData;
  const bookData = {
    title: "No Title Found",
    author_name: "No Author Found",
    first_publish_year: "No First Publish Year Found",
    cover_i: "No Cover Found",
  };

  try {
    const resp = await fetch(`${URL}${params.slug[1]}.json`);
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    data = await resp.json();

    if (data.authors && data.authors[0]?.author?.key) {
      const authorResp = await fetch(`${baseURL}${data.authors[0].author.key}.json`);
      if (!authorResp.ok) throw new Error(`HTTP error! status: ${authorResp.status}`);
      authorData = await authorResp.json();
    }

    bookData.title = data.title ?? bookData.title;
    bookData.author_name = authorData?.personal_name ?? bookData.author_name;
    bookData.first_publish_year = data.first_publish_year ?? bookData.first_publish_year;
    bookData.cover_i = data.covers?.[0] ?? bookData.cover_i;
  } catch (error) {
    console.error("Error fetching book data:", error);
    // You might want to handle the error differently, e.g., redirecting to an error page
  }

  return (
  	<BookMainComponent
  		key={params.slug[1]}
  		id={params.slug[1]}
  		description={
  			typeof data.description === "object"
  				? data.description.value
  				: data.description
  					? data.description
  					: "No Description Found."
  		}
			author_name={bookData.author_name}
			first_publish_year={bookData.first_publish_year}
  		title={data.title ?? "No Title Found"}
  		cover_img={
  			data.covers?.length > 0
  				? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
  				: ""
  		}
  		subjects={data.subjects ? data.subjects : ["No Subject Found"]}
  	/>
  );
}