import { Bleed, For, HStack, Heading, Stack } from "@chakra-ui/react";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { getEpisodeByWebtoonIdAndEpisodeNumber } from "~/actions/webtoons.action";
import { LinkButton } from "~/components/ui/link-button";

type WebtoonEpisdoePageProps = Readonly<{
	params: Promise<{
		id: string;
		no: string;
	}>;
}>;

const WebtoonEpisdoePage: FC<WebtoonEpisdoePageProps> = async ({ params }) => {
	const { id, no } = await params;

	const response = await getEpisodeByWebtoonIdAndEpisodeNumber({
		webtoonId: +id,
		episodeNumber: +no,
	});

	if (!response?.data) {
		return notFound();
	}

	const episode = response.data;

	return (
		<Stack>
			<Heading>{episode.subtitle}</Heading>
			<Bleed inline="4">
				<Stack gap="0" alignItems="center">
					<For each={episode.contents}>
						{(contentUrl) => (
							<NextImage
								key={contentUrl}
								src={contentUrl}
								width={690}
								height={0}
								alt="content"
							/>
						)}
					</For>
				</Stack>
			</Bleed>

			<HStack justifyContent="center">
				{episode.episodeNumber !== 1 && (
					<LinkButton
						href={`/webtoons/${episode.webtoon.id}/${episode.episodeNumber - 1}`}
						size="lg"
					>
						이전화
					</LinkButton>
				)}

				<LinkButton
					href={`/webtoons/${episode.webtoon.id}/${episode.episodeNumber + 1}`}
					size="lg"
				>
					다음화
				</LinkButton>
			</HStack>

			<Stack>TODO: 댓글</Stack>
		</Stack>
	);
};

export default WebtoonEpisdoePage;
