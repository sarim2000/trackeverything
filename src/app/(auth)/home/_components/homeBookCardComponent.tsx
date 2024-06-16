"use client";

import type { MyBook } from "@/lib/types";
import {
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Group,
    Image,
    Text,
} from "@mantine/core";
import Link from "next/link";

export default function HomeBookCardComponent({ book }: { book: MyBook }) {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ width: "300px" }}
            key={book.key}
        >
            <Card.Section>
                <Image
                    fit="contain"
                    src={book.cover_i}
                    height={320}
                    alt={book.title}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} lineClamp={1}>
                    {book.title}
                </Text>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={4} style={{ minHeight: "80px" }}>
                {book.first_sentence}
            </Text>
            <Link href={`/home/mybooks/${book.$id}`} style={{ textDecoration: "none" }}>
                <Button fullWidth mt="md" radius="md">
                    Edit / View
                </Button>
            </Link>
        </Card>
    );
}
