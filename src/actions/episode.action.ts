"use server";

import { notFound } from "next/navigation";
import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { actionClient } from "~/lib/safe-action";
import { getSession } from "./auth.action";

export const getEpisode = actionClient
	.schema(
		z.object({
			episodeId: z.number(),
		}),
	)
	.action(async ({ parsedInput: { episodeId } }) => {
		const episode = await prisma.episode.findUnique({
			where: {
				id: episodeId,
			},
		});

		if (!episode) {
			return notFound();
		}

		const session = await getSession();

		if (session) {
			await prisma.viewHistory.upsert({
				where: {
					episodeId_userId: {
						episodeId: episode.id,
						userId: session.user.id,
					},
				},
				update: {
					viewedAt: new Date(),
				},
				create: {
					webtoonId: episode.webtoonId,
					episodeId: episode.id,
					userId: session.user.id,
				},
			});
		}

		return episode;
	});
