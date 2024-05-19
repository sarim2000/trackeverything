import { Title, Text, Button, Container } from '@mantine/core';
import classes from '@/styles/Herotext.module.css'
import Link from 'next/link';
import { Dots } from '@/components/ui/Dots';

export default function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Your Ultimate{' '}
          <Text component="span" className={classes.highlight} inherit>
            Entertainment Tracking Hub
          </Text>{' '}
          - All in One Place
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Effortlessly track and organize your favorite books, movies, TV shows, and video games. Never lose track of your entertainment journey again!
          </Text>
        </Container>
        <div className={classes.controls}>
          <Button className={classes.control} size="lg" variant="default" color="gray" radius="md">
            <Link href="/signin" style={{ textDecoration: 'none', color: 'white' }}>

              Welcome Back
            </Link>
          </Button>
          <Button className={classes.control} size="lg" radius="md">
            <Link href="/signup" style={{ textDecoration: 'none', color: 'white' }}>
              Get Started
            </Link>
          </Button>

        </div>
      </div>
    </Container>
  );
}