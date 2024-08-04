
import BookCardComponent from '@/app/(auth)/books/_components/bookcards';
import Search from '@/components/ui/search';
import type { Book, MyBook } from '@/lib/types';
import { Box, Divider, Flex, Text } from '@mantine/core';
import HomeBookCardComponent from './_components/homeBookCardComponent';
import MediaLibrary from './_components/mediaLibrary';


export default async function Page() {
  return (
    <Flex direction={'column'} gap={'lg'}>
      <Box>
        <h1>my library</h1>
      </Box>
      
      <Flex direction={'column'} gap={'lg'}>
        {/* <Search /> */}
        <Box>
          {/* {
            data.length > 0 ? (
              <Text size={"xl"}>my books</Text>
            ) : (
              <Text size={"xl"}>No books found</Text>
            )} */}
            <MediaLibrary type='books' />
          {/* <Divider my="md" /> */}
          <Flex gap={'lg'} wrap={'wrap'}>
            {/* {data.map((book: MyBook) => {
              return <HomeBookCardComponent key={book.key} book={book} />;
            })} */}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
