import { For, Stack } from "@chakra-ui/react";
import type { Episode } from "@prisma/client";
import type { FC } from "react";
import { EpisodeListItem } from "./item";

type Props = Readonly<{
	episodes: Episode[];
}>;

export const EpisodeList: FC<Props> = ({ episodes }) => {
	return (
		<Stack>
			<For each={episodes}>
				{(episode) => <EpisodeListItem key={episode.id} episode={episode} />}
			</For>
		</Stack>
	);
};
