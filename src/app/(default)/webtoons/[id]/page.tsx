import { Button, Flex, Stack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { LuPlus } from "react-icons/lu";
import { EpisodeList } from "~/components/episodes/list";
import { WebtoonDetail } from "~/components/webtoons/detail";
import { prisma } from "~/lib/prisma";

type Props = Readonly<{
	params: Promise<{ id: string }>;
}>;

const WebtoonPage: FC<Props> = async ({ params }) => {
	const { id } = await params;

	const webtoon = await prisma.webtoon.findUnique({
		where: { id: +id },
		include: { tags: true },
	});

	if (!webtoon) {
		return notFound();
	}

	const episdoes = await prisma.episode.findMany({
		where: { webtoonId: +id },
	});

	return (
		<Stack gap="4">
			<WebtoonDetail webtoon={webtoon} />

			<Flex gap="4">
				<Button size="xl" flexGrow="1">
					<LuPlus /> 관심
				</Button>
				<Button variant="outline" size="xl" flexGrow="1">
					첫화보기
				</Button>
			</Flex>

			<EpisodeList episodes={episdoes} />
		</Stack>
	);
};

export default WebtoonPage;
