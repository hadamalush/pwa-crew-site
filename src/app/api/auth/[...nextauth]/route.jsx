import { verifyPassword } from "@/lib/crypt";
import { findDocument } from "@/lib/mongodb";
import { connectDatabase } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt({ token, user, trigger, session }) {
			if (
				(trigger === "update" && session?.user?.email) ||
				session?.user?.picture
			) {
				token.email = session.user?.email;
				token.picture = session?.user?.picture
					? session?.user?.picture
					: session.user?.image;
			}

			if (user && trigger === "signIn") {
				token.email = user.email;
				token.picture = user.picture;
			}
			return token;
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const client = await connectDatabase();

				const user = await findDocument(client, "Users", {
					email: credentials.email,
				});

				if (!user) {
					client.close();

					const error = new Error("404");

					throw error;
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();

					const error = new Error("422");

					throw error;
				}

				client.close();
				return { email: user.email, picture: user?.avatarImg };
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
