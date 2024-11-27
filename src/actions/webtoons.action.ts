"use server";

import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";
import { prisma } from "~/lib/prisma";
import { getSession } from "./auth.action";

export const getWebtoons = async (
	args?: Prisma.WebtoonFindManyArgs<DefaultArgs>,
) => {
	return prisma.webtoon.findMany(args);
};

export const getWebtoonWithTags = async ({
	webtoonId,
}: { webtoonId: number }) => {
	return prisma.webtoon.findUnique({
		where: {
			id: webtoonId,
		},
		include: {
			tags: true,
		},
	});
};

export const getEpisodeByWebtoonIdAndEpisodeNumber = async ({
	webtoonId,
	episodeNumber,
}: { webtoonId: number; episodeNumber: number }) => {
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
};
