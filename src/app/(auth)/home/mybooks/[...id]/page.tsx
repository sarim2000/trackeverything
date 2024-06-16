import { getMyBooks } from "@/app/(auth)/home/mybooks/_actions/mybooks";

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getMyBooks(params.id);
    console.log(data);
    return <div>My Book: {data?.$id}</div>
}