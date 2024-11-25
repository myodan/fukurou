"use server";

import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { actionClient } from "~/lib/safe-action";

export const getRecentlyViewHistories = actionClient
	.schema(
		z.object({
			userId: z.string(),
		}),
	)
	.action(async ({ parsedInput: { userId } }) => {
		return await prisma.viewHistory.findMany({
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
	});

export const getRecentlyViewHistoryByWebtoonId = actionClient
	.schema(
		z.object({
			userId: z.string(),
			webtoonId: z.number(),
		}),
	)
	.action(async ({ parsedInput: { userId, webtoonId } }) => {
		return await prisma.viewHistory.findMany({
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
	});
