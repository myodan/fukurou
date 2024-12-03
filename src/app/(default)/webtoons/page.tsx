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
		page?: string;
	}>;
};

const WebtoonsPage: FC<WebtoonsPageProps> = async ({ searchParams }) => {
	const page = Number.parseInt((await searchParams).page ?? "1");

	const webtoons = await prisma.webtoon.findMany({
		skip: (page - 1) * 10,
		take: 105,
	});

	const total = await prisma.webtoon.count();

	return (
		<Stack separator={<StackSeparator />}>
			<HStack justifyContent="space-between">
				<Heading>전체 웹툰</Heading>
				<Text color="fg.muted">
					총 <FormatNumber value={total} />개
				</Text>
			</HStack>
			<WebtoonList page={page} total={total} webtoons={webtoons} />
		</Stack>
	);
};

export default WebtoonsPage;
