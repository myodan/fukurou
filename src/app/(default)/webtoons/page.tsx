import {
	FormatNumber,
	HStack,
	Heading,
	Stack,
	StackSeparator,
	Text,
} from "@chakra-ui/react";
import type { FC } from "react";
import { Alert } from "~/components/ui/alert";
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
		...(tags && {
			where: {
				tags: {
					some: {
						name: {
							in: tags,
						},
					},
				},
			},
		}),
		include: {
			tags: true,
		},
		orderBy: {
			totalView: "desc",
		},
	});

	return (
		<Stack separator={<StackSeparator />}>
			<Alert
				status="error"
				title="본 사이트는 학교 과제용 사이트입니다. 실제로 운영되지 않습니다."
			/>
			<HStack justifyContent="space-between">
				{!tags && <Heading>전체 웹툰</Heading>}
				{tags && <Heading>{tags.join(", ")} 웹툰</Heading>}
				<Text color="fg.muted">
					총 <FormatNumber value={webtoons.length} />개
				</Text>
			</HStack>
			<WebtoonList webtoons={webtoons} />
		</Stack>
	);
};

export default WebtoonsPage;
