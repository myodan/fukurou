"use server";

import { prisma } from "~/lib/prisma";

export const getRecentlyViewHistories = async ({
	userId,
}: { userId: string }) => {
	return prisma.viewHistory.findMany({
		where: {
			userId,
		},
		distinct: ["webtoonId"],
		include: {
			webtoon: {
				include: {
					tags: true,
				},
			},
			episode: true,
		},
		orderBy: {
			viewedAt: "desc",
		},
	});
};

export const getRecentlyViewHistoryByWebtoonId = async ({
	userId,
	webtoonId,
}: { userId: string; webtoonId: number }) => {
	return prisma.viewHistory.findMany({
		where: {
			AND: [{ userId }, { webtoonId }],
		},
		distinct: ["webtoonId"],
		include: {
			webtoon: {
				include: {
					tags: true,
				},
			},
			episode: true,
		},
		orderBy: {
			viewedAt: "desc",
		},
	});
};
