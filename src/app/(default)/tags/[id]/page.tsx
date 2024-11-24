import { FormatNumber, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { WebtoonList } from "~/components/webtoons/list";
import { prisma } from "~/lib/prisma";

type TagPageProps = Readonly<{
	params: Promise<{
		id: string;
	}>;
}>;

const TagPage: FC<TagPageProps> = async ({ params }) => {
	const { id } = await params;

	const tag = await prisma.tag.findUnique({
		where: { id: +id },
	});

	if (!tag) {
		return notFound();
	}

	const webtoons = await prisma.webtoon.findMany({
		where: {
			tags: {
				some: {
					id: +id,
				},
			},
		},
	});

	return (
		<Stack gap="4">
			<HStack justifyContent="space-between">
				<Heading>{tag.name}</Heading>
				<Text color="fg.muted">
					총 <FormatNumber value={webtoons.length} />개
				</Text>
			</HStack>
			<WebtoonList webtoons={webtoons} />
		</Stack>
	);
};

export default TagPage;
