import { For, Grid } from "@chakra-ui/react";
import type { Webtoon } from "@prisma/client";
import type { FC } from "react";
import { WebtoonListItem } from "./item";

type Props = Readonly<{
	webtoons: Webtoon[];
}>;

export const WebtoonList: FC<Props> = ({ webtoons }) => {
	return (
		<Grid
			templateColumns={{
				base: "repeat(3, 1fr)",
				md: "repeat(5, 1fr)",
				lg: "repeat(7, 1fr)",
			}}
			gap="2"
		>
			<For each={webtoons}>
				{(webtoon) => <WebtoonListItem key={webtoon.id} webtoon={webtoon} />}
			</For>
		</Grid>
	);
};
