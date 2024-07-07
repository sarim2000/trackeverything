import BookCardComponent from "@/components/ui/bookcards";
import Search from "@/components/ui/search";
import { getBooksByUserId } from "@/lib/actions/books.actions";
import type { Book, MyBook } from "@/lib/types";
import { Box, Divider, Flex, Text } from "@mantine/core";
import HomeBookCardComponent from "./_components/homeBookCardComponent";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <Flex direction={"column"} gap={"lg"}>
      <Box>
        <h1>my library</h1>
      </Box>
      <Flex direction={"column"} gap={"lg"}>
        {/* <Search /> */}
        <Box>
          {/* {
            data.length > 0 ? (
              <Text size={"xl"}>my books</Text>
            ) : (
              <Text size={"xl"}>No books found</Text>
            )} */}
          <Divider my="md" />
          <Flex gap={"lg"} wrap={"wrap"}>
            {/* {data.map((book: MyBook) => {
              return <HomeBookCardComponent key={book.key} book={book} />;
            })} */}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
