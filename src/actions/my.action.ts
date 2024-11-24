"use server";

import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { actionClient } from "~/lib/safe-action";

export const getRecentlyViewedWebtoons = actionClient
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
