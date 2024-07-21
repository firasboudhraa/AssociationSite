import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/google`, {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          googleId: profile.sub, 
        });

        if (response.data.status === 'success') {
          return true; 
        } else {
          return false; 
        }
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

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}