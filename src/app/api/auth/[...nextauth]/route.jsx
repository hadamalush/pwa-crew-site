import { verifyPassword } from "@/lib/crypt";
import { findDocument } from "@/lib/mongodb";
import { connectDatabase } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/logowanie",
		// signOut: "/rejestracja",
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

					const error = new Error("Nie znaleziono takiego użytkownika.");

					throw error;
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					// client.close();

					const error = new Error("Hasło jest niepoprawne", { status: 422 });

					throw error;
				}

				// client.close();
				return { email: user.email };
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
