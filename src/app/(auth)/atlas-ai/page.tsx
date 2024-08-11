'use client';

import { AISuggestions } from '@/baml_client';
import LoadingUI from '@/components/ui/loading-ui';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  Select,
  SemiCircleProgress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
  
} from '@mantine/core';
import { useCallback, useState } from 'react';


import PersonalizedRecommendations from './personalized';
import MoodBasedRecommendations from './mood';
import { useMediaQuery } from '@mantine/hooks';
import { IconHammer } from '@tabler/icons-react';
import ExploreRecommendations from './explore';
import { useQuery } from '@tanstack/react-query';
import { getAtlasLimit } from '@/actions/redis';

export default function Page() {
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions[] | undefined>(undefined);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [gemModalOpen, setGemModalOpen] = useState(false);
  const [gemRevealed, setGemRevealed] = useState(false);
  const { data: atlasLimit, isFetched } = useQuery({
    queryKey: ['atlasLimit'],
    queryFn: async() => {
      const limit = await getAtlasLimit();
      if (!limit) {
        throw new Error('Atlas limit not found');
      }
      return limit * 10;
    },
  });

  const handleViewChallenge = () => {
    setChallengeModalOpen(true);
    // Here you would fetch the daily challenge from your backend
  };

  return (
    <Flex direction="column" gap="md">
      <Box mb="md">
        <Title order={2}>A.T.L.A.S AI Recommendations</Title>
        <Text size="sm" c="dimmed">
          Adaptive Taste Learning and Suggestion System
        </Text>
      </Box>

      <Grid gutter={isMobile ? 'xs' : 'md'}>
        <Grid.Col order={isMobile ? 2 : 1} span={isMobile ? 12 : 8}>
          <Card>
            <Tabs defaultValue="forYou">
              <Tabs.List grow={isMobile}>
                <Tabs.Tab value="forYou">For You</Tabs.Tab>
                <Tabs.Tab value="explore">Explore</Tabs.Tab>
                <Tabs.Tab value="moodBased">Mood</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="forYou">
                <PersonalizedRecommendations />
              </Tabs.Panel>

              <Tabs.Panel value="explore">
                <ExploreRecommendations />
              </Tabs.Panel>

              <Tabs.Panel value="moodBased">
                <MoodBasedRecommendations />
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Grid.Col>

        <Grid.Col order={isMobile ? 1 : 2} span={isMobile ? 12 : 4}>
          <SimpleGrid cols={1} spacing={isMobile ? 'xs' : 'md'}>
            <Card>
              <Title order={4} mb="xs">
                Daily A.T.L.A.S Limit
              </Title>
              <Text size="sm" c="dimmed" mb="md">
                You're {atlasLimit ? atlasLimit : 0}% through your daily A.T.L.A.S recommendations. Keep going!
              </Text>
              {isFetched && (
                <Flex direction="column" gap="xs" align="center">
                  <SemiCircleProgress
                    value={atlasLimit ? atlasLimit : 0}
                    transitionDuration={250}
                    label={`${atlasLimit}%`}
                    labelPosition="center"
                  />
                </Flex>
              )}
            </Card>
            <Card>
              <Title order={4}>Daily Challenge</Title>
              <Text size={isMobile ? 'sm' : 'md'}>Step out of your comfort zone with this daily book challenge.</Text>
              <Button mt="sm" fullWidth={isMobile} onClick={handleViewChallenge}>
                View Challenge
              </Button>
            </Card>

            <Card>
              <Title order={4}>Hidden Gem</Title>
              <Text size={isMobile ? 'sm' : 'md'}>Discover an underappreciated book that matches your tastes.</Text>
              <Button mt="sm" fullWidth={isMobile} onClick={() => setGemModalOpen(true)}>
                Reveal Gem
              </Button>
            </Card>
          </SimpleGrid>
        </Grid.Col>
      </Grid>

      <Modal opened={challengeModalOpen} onClose={() => setChallengeModalOpen(false)} title="Daily Reading Challenge">
        <Image src="/path-to-book-cover.jpg" alt="Book Cover" width={200} mx="auto" />
        <Title order={3} mt="md">
          Challenge: Read "Book Title" by Author Name
        </Title>
        <Text mt="sm">This book is outside your usual genres. It's a thrilling mystery set in Victorian London.</Text>
        <Text mt="sm">
          Why this challenge? Expanding your reading horizons can introduce you to new perspectives and writing styles.
        </Text>
        <Group mt="lg">
          <Button variant="outline" onClick={() => setChallengeModalOpen(false)}>
            Maybe Later
          </Button>
          <Button
            onClick={() => {
              /* Logic to accept challenge */
            }}
          >
            Accept Challenge
          </Button>
        </Group>
      </Modal>

      <Modal opened={gemModalOpen} onClose={() => setGemModalOpen(false)} title="Hidden Gem">
        {gemRevealed ? (
          <>
            <Image src="/path-to-book-cover.jpg" alt="Book Cover" width={200} mx="auto" />
            <Title order={3} mt="md">
              Hidden Gem: "Book Title" by Author Name
            </Title>
            <Text mt="sm">
              This book is a lesser-known gem in your favorite genre. It has received high praise from critics and
              readers alike.
            </Text>
            <Button mt="lg" onClick={() => setGemModalOpen(false)}>
              Close
            </Button>
          </>
        ) : (
          <>
            <LoadingUI />
            <Text mt="sm">Revealing your hidden gem...</Text>
          </>
        )}
      </Modal>
    </Flex>
  );
}
