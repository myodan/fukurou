import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { VerificationEmailTemplate } from "~/components/emails/verification-email";
import { prisma } from "./prisma";
import { resend } from "./resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			await resend.emails.send({
				from: "Fukurou <fukurou@myodan.me>",
				to: [user.email],
				subject: "이메일 인증",
				react: VerificationEmailTemplate({ url }),
			});
		},
	},
	advanced: {
		cookiePrefix: "fukurou",
	},
	plugins: [nextCookies(), admin()],
});

export type Session = typeof auth.$Infer.Session;
