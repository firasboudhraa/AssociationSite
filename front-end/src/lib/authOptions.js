import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      clientId: '981942360118-cpv5v6lurs2udjmtu1p3v3qcn9upgcf5.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const emailVerified = profile.email_verified || false;
        const emailDomain = profile.email ? profile.email.endsWith("@example.com") : false;
        return emailVerified && emailDomain;
      }
      return true;
    },
  },
};

export default authOptions;
