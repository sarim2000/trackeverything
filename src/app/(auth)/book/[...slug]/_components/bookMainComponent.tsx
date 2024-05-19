'use client';
import { sumbitBooks } from '@/lib/actions/books.actions';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  Container,
  Title,
} from '@mantine/core';
import { IconArrowRight, IconBook, IconPhoto } from '@tabler/icons-react';

export default function BookMainComponent({
  description,
  title,
  cover_img,
  subjects,
}: {
  description: string;
  title: string;
  cover_img: string;
  subjects: string[];
}) {
  console.log('🚀 ~ subjects:', subjects);
  return (
    <Flex direction={'column'} align={'center'} gap={'lg'}>
      <Box>
        <Title order={1}>{title}</Title>
      </Box>
      <Container fluid>
        <Image fit="fill" src={cover_img} height={320} alt={title} />
      </Container>
      <Box>
        <Button
          onClick={async () => await sumbitBooks({title, description, cover_img})}
          variant="light"
          leftSection={<IconBook size={14} />}
          rightSection={<IconArrowRight size={14} />}
        >
          Add
        </Button>
      </Box>
      <Box style={{ width: '100%' }}>
        <Flex wrap={'wrap'} gap={'md'} align={'center'}>
          {subjects.slice(0, 5).map((subject, ind) => (
            <Badge key={ind}>{subject}</Badge>
          ))}
        </Flex>
      </Box>
      <Box style={{ width: '100%' }}>
        <Title order={3}>{description}</Title>
      </Box>
    </Flex>
  );
}
