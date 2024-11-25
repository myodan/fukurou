import { Flex, Image, Text } from "@chakra-ui/react";
import type { Episode } from "@prisma/client";
import NextImage from "next/image";
import NextLink from "next/link";
import type { FC } from "react";

type Props = Readonly<{
	episode: Episode;
}>;

export const EpisodeListItem: FC<Props> = ({ episode }) => {
	return (
		<NextLink
			href={`/webtoons/${episode.webtoonId}/${episode.episodeNumber}`}
			passHref
		>
			<Flex
				gap="4"
				padding="2"
				borderWidth="1px"
				rounded="md"
				transition="all"
				_hover={{ background: "bg.subtle" }}
			>
				<Flex height="16" aspectRatio={16 / 9} position={"relative"}>
					<Image rounded="md" objectFit="cover" asChild>
						<NextImage src={episode.thumbnailUrl} alt="thumbnail" fill />
					</Image>
				</Flex>
				<Flex
					flexBasis="full"
					flexDirection="column"
					justifyContent="space-between"
					gap="4"
				>
					<Text fontSize="lg">{episode.subtitle}</Text>
					<Text fontSize="sm" color="fg.muted">
						{new Date(episode.createdAt).toLocaleDateString()}
					</Text>
				</Flex>
			</Flex>
		</NextLink>
	);
};
