import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email public_profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        const imageUrl = account.provider === 'facebook' ? profile.picture.data.url : profile.picture;

        const response = await axios.post(`${BASE_URL}/auth/${account.provider}`, {
          email: profile.email,
          name: profile.name,
          image: imageUrl,
          providerId: profile.id,
        });

        return response.data.status === 'success';
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
