import { Box, Flex } from "@mantine/core";
import { Suspense } from "react";
import Search from "@/components/ui/search";
import BookLayout from "./main";
import Loading from "./loading";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    page?: string;
  };
}) {
  const query = searchParams?.title || "";


  return (
    <Flex direction={"column"} align={"center"} gap={"lg"}>
      <Box>
        <h1>Find Your Book!</h1>
      </Box>
      <Flex direction={"column"} align={"center"} gap={"lg"}>
        <Flex direction={"column"} gap={"md"} align={"center"}>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Search />
            <Suspense key={query} fallback={<Loading/>}>
              <BookLayout query={query} />
            </Suspense>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
