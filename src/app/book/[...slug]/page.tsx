import BookMainComponent from "../_components/bookMainComponent";

const URL = "https://openlibrary.org/works/";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("params.slug", params.slug[1]);
  const resp = await fetch(`${URL}${params.slug[1]}.json`);
  const data = await resp.json();
  console.log("🚀 ~ Page ~ data:", data)


  


  return (
    <BookMainComponent
      description={data.description ?  data.description : "No Description Found"}
      title={data.title ?? "No Title Found"}
      cover_img={data.covers[0] ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : ''}
      subjects = {data.subjects ? data.subjects : ["No Subject Found"]}
      subject_people = {data.subject_people ? data.subject_people.join(",") : "No Subject People Found"}
      subject_times = {data.subject_times ? data.subject_times.join(",") : "No Subject Times Found"}
    />
  );
}
