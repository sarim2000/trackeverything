import { Title, Text, Container } from '@mantine/core';
import classes from '@/styles/hero.module.css';
import { GoogleIcon } from '@/components/icons/google';
import { SignInButton } from '@/components/ui/login/signinbutton';
import { Dots } from '@/components/ui/Dots1';

export default function Home() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          TrackEverything AI{' '}
          <Text component="span" className={classes.highlight} inherit>
            for any media
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            TrackEverything is a platform for tracking everything. It is a platform for tracking everything.
          </Text>
        </Container>

        <div className={classes.controls}>
          <SignInButton radius="xl" icon={<GoogleIcon />}>
            Google
          </SignInButton>
        </div>
      </div>
    </Container>
  );
}
