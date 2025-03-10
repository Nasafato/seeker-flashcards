import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { Provider } from "next-auth/providers"
import { EdgeDBAdapter } from "@auth/edgedb-adapter"
import { createHttpClient } from "gel"
 
const providers: Provider[] = [
  GitHub,
]

const client = createHttpClient({
  // TODO: remove this.
  tlsSecurity: 'insecure',
  dsn: process.env.AUTH_EDGEDB_DSN,
});

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: EdgeDBAdapter(client),
  providers,
  debug: true,
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt', token, user)
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, user, token }) {
      console.log('session', session, user, token)
      if (token?.id) {
        session.user.id = token.id as string;
      } else if (user?.id) {
        session.user.id = user.id as string;
      }
      return session
    },
  },
})