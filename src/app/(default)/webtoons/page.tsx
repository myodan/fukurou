import { FormatNumber, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { getWebtoons } from "~/actions/webtoons.action";
import { WebtoonList } from "~/components/webtoons/list";

const WebtoonsPage: FC = async () => {
	const webtoons = await getWebtoons();

	if (!webtoons) {
		return notFound();
	}

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
