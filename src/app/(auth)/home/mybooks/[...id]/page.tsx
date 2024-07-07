import { getMyBooks } from "@/app/(auth)/home/mybooks/_actions/mybooks";

export default async function Page({ params }: { params: { id: string } }) {
  return <div>My Book: {params?.id}</div>
}