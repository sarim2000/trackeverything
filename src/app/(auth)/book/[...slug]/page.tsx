import BookMainComponent from './_components/bookMainComponent';

const URL = 'https://openlibrary.org/works/';

export default async function Page({ params }: { params: { slug: string } }) {
  const resp = await fetch(`${URL}${params.slug[1]}.json`);
  const data = await resp.json();

  return (
    <BookMainComponent
      key={params.slug[1]}
      id={params.slug[1]}
      description={
        typeof data.description === 'object'
          ? data.description.value
          : data.description
            ? data.description
            : 'No Description Found.'
      }
      title={data.title ?? 'No Title Found'}
      cover_img={
        data.covers?.length > 0 ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : ''
      }
      subjects={data.subjects ? data.subjects : ['No Subject Found']}
    />
  );
}
