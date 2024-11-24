import { Flex, Image, Text } from "@chakra-ui/react";
import type { Webtoon } from "@prisma/client";
import NextImage from "next/image";
import NextLink from "next/link";
import type { FC } from "react";

type Props = Readonly<{
	webtoon: Webtoon;
}>;

export const WebtoonListItem: FC<Props> = ({ webtoon }) => {
	return (
		<NextLink href={`/webtoons/${webtoon.id}`} passHref>
			<Flex flexDirection="column" gap="1">
				<Flex
					position="relative"
					aspectRatio={3 / 4}
					rounded="md"
					overflow="hidden"
				>
					<Image objectFit="cover" asChild>
						<NextImage src={webtoon.thumbnailUrl} alt={webtoon.title} fill />
					</Image>
				</Flex>
				<Text textAlign={"center"} lineClamp={1}>
					{webtoon.title}
				</Text>
			</Flex>
		</NextLink>
	);
};
