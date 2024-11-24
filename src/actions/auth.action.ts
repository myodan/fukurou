"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { actionClient } from "~/lib/safe-action";
import { signInSchema } from "~/schemas/sign-in-schema";
import { signUpSchema } from "~/schemas/sign-up-schema";

export const signIn = actionClient
	.schema(signInSchema)
	.action(async ({ parsedInput }) => {
		await auth.api.signInEmail({
			headers: await headers(),
			body: parsedInput,
		});

		redirect("/");
	});

export const signUp = actionClient
	.schema(signUpSchema)
	.action(async ({ parsedInput }) => {
		await auth.api.signUpEmail({
			headers: await headers(),
			body: parsedInput,
		});

		redirect("/");
	});

export const signOut = actionClient.action(async () => {
	await auth.api.signOut({ headers: await headers() });
});

export const getSession = async () => {
	return await auth.api.getSession({ headers: await headers() });
};
