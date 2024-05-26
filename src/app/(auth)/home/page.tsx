import BookCardComponent from "@/components/ui/bookcards";
import Search from "@/components/ui/search";
import { getBooksByUserId } from "@/lib/actions/books.actions";
import { Book } from "@/lib/types";
import { Flex, Box, Text, Divider } from "@mantine/core";


export default async function Page() {
  const data = await getBooksByUserId()
  console.log('🚀 ~ Page ~ data:', data);
  return <Flex direction={'column'} gap={'lg'}>
    <Box>
      <h1>my library</h1>
    </Box>
    <Flex direction={'column'} gap={'lg'}>
      {/* <Search /> */}
      <Box>
        <Text size={'xl'} >my books</Text>
        <Divider my="md" />
        <Flex gap={'lg'} wrap={'wrap'} >
        {
          data.map((book: Book, id: number) => {
            return <BookCardComponent key={id} book={book} />;
          })
        }
        </Flex>
      </Box>
    </Flex>
  </Flex>;
}

