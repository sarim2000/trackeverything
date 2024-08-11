import { ConvexAdapter } from '@/app/ConvexAdapter';
import { SignJWT, importPKCS8 } from 'jose';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(/.cloud$/, '.site');

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [Google],
  adapter: ConvexAdapter,
  trustHost: true,
  callbacks: {
    async session({ session }) {
      const privateKeyString = process.env.CONVEX_AUTH_PRIVATE_KEY!;
      // Ensure the key is in PEM format
      const pemKey = privateKeyString.startsWith('-----BEGIN PRIVATE KEY-----')
        ? privateKeyString
        : `-----BEGIN PRIVATE KEY-----\n${privateKeyString}\n-----END PRIVATE KEY-----`;

      const privateKey = await importPKCS8(pemKey, 'RS256');

      const convexToken = await new SignJWT({
        sub: session.userId,
      })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setIssuer(CONVEX_SITE_URL)
        .setAudience('convex')
        .setExpirationTime('1h')
        .sign(privateKey);
      return { ...session, convexToken, userId: session.userId };
    },
  },
});

// ... rest of the file remains unchanged
