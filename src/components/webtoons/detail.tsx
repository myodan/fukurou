import { Flex, For, HStack, Heading, Image, Text } from "@chakra-ui/react";
import type { Prisma } from "@prisma/client";
import NextImage from "next/image";
import NextLink from "next/link";
import type { FC } from "react";
import { Tag } from "../ui/tag";

type Props = Readonly<{
	webtoon: Prisma.WebtoonGetPayload<{
		include: {
			tags: true;
		};
	}>;
}>;

export const WebtoonDetail: FC<Props> = ({ webtoon }) => {
	return (
		<Flex minHeight="64" gap="4">
			<Flex height="64" aspectRatio={3 / 4} position="relative">
				<Image rounded="md" objectFit="cover" asChild>
					<NextImage src={webtoon.thumbnailUrl} alt="thumbnail" fill />
				</Image>
			</Flex>
			<Flex flexDirection="column" gap="2" flexGrow="1">
				<Heading>{webtoon.title}</Heading>
				<Text whiteSpace="pre-wrap">{webtoon.synopsis}</Text>
				<HStack gap="1" flexWrap="wrap">
					<For each={webtoon.tags}>
						{(tag) => (
							<NextLink href={`/tags/${tag.id}`} passHref>
								<Tag key={tag.id}>{tag.name}</Tag>
							</NextLink>
						)}
					</For>
				</HStack>
			</Flex>
		</Flex>
	);
};
