import {
	FormatNumber,
	HStack,
	Heading,
	Stack,
	StackSeparator,
	Text,
} from "@chakra-ui/react";
import type { FC } from "react";
import { WebtoonList } from "~/components/webtoons/list";
import { prisma } from "~/lib/prisma";

type WebtoonsPageProps = {
	searchParams: Promise<{
		tags?: string;
	}>;
};

const WebtoonsPage: FC<WebtoonsPageProps> = async ({ searchParams }) => {
	const tags = (await searchParams).tags?.split(",");

	const webtoons = await prisma.webtoon.findMany({
		where: {
			tags: {
				some: {
					name: {
						in: tags,
					},
				},
			},
		},
		include: {
			tags: true,
		},
		orderBy: {
			totalView: "desc",
		},
	});

	return (
		<Stack separator={<StackSeparator />}>
			<HStack justifyContent="space-between">
				<Heading>전체 웹툰</Heading>
				<Text color="fg.muted">
					총 <FormatNumber value={webtoons.length} />개
				</Text>
			</HStack>
			<WebtoonList webtoons={webtoons} />
		</Stack>
	);
};

export default WebtoonsPage;
