export async function GET(request: Request) {
    const res = await fetch(
      "https://openlibrary.org/search.json?q=harry%20potter&fields=author_name,availability,cover_edition_key,first_publish_year,first_sentence,title&limit=1"
    );
    const data = await res.json();

    return {
      body: data,
    };
}
