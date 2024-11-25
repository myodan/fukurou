"use server";

import { notFound } from "next/navigation";
import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { actionClient } from "~/lib/safe-action";
import { getSession } from "./auth.action";

export const getWebtoons = actionClient.action(async () => {
	const webtoons = await prisma.webtoon.findMany();

	return webtoons;
});

export const getEpisodeByWebtoonIdAndEpisodeNumber = actionClient
	.schema(
		z.object({
			webtoonId: z.number(),
			episodeNumber: z.number(),
		}),
	)
	.action(async ({ parsedInput: { webtoonId, episodeNumber } }) => {
		const episode = await prisma.episode.findUnique({
			where: {
				webtoonId_episodeNumber: {
					webtoonId,
					episodeNumber,
				},
			},
			include: {
				webtoon: true,
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
