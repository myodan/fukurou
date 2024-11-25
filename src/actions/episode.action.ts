"use server";

import { prisma } from "~/lib/prisma";

export const getEpisodeByWebtoonId = async ({
	webtoonId,
}: { webtoonId: number }) => {
	return prisma.episode.findMany({ where: { webtoonId } });
};
