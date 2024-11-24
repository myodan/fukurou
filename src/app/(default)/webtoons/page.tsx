import { FormatNumber, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { WebtoonList } from "~/components/webtoons/list";
import { prisma } from "~/lib/prisma";

const WebtoonsPage: FC = async () => {
	const webtoons = await prisma.webtoon.findMany();

	return (
		<Stack gap="4">
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
