import { Code, HStack } from "@chakra-ui/react";
import type { FC } from "react";
import { getEpisode } from "~/actions/episode.action";
import { Button } from "~/components/ui/button";

type Props = Readonly<{
	params: Promise<{ id: string }>;
}>;

const EpisodePage: FC<Props> = async ({ params }) => {
	const { id } = await params;
	const episode = await getEpisode({ episodeId: +id });

	return (
		<HStack justifyContent="center">
			<Button size="lg">이전화</Button>
			<Code as="pre" padding="4">
				{JSON.stringify(episode, null, 2)}
			</Code>
			<Button size="lg">다음화</Button>
		</HStack>
	);
};

export default EpisodePage;
