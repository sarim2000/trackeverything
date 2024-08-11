import { AISuggestions } from "@/baml_client";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import { SuggestionCard } from "./Card";

export default function BookSuggestionList({ suggestions }: { suggestions: AISuggestions[] }) {
  return (
    <>
      <Flex direction="column" gap="md" mt="lg">
        <Text size="lg" fw={500}>
          {suggestions.length} books found
        </Text>
        <SimpleGrid cols={1} spacing="lg">
          {suggestions.map((book) => (
            <SuggestionCard suggestedBook={book} key={book.title} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};
