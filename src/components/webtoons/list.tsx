"use client";

import { For, Grid, HStack, Stack } from "@chakra-ui/react";
import type { Webtoon } from "@prisma/client";
import type { FC } from "react";
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "../ui/pagination";
import { WebtoonListItem } from "./item";

type Props = Readonly<{
	page: number;
	total: number;
	webtoons: Webtoon[];
}>;

export const WebtoonList: FC<Props> = ({ page, total, webtoons }) => {
	return (
		<Stack>
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
			<PaginationRoot
				count={total}
				pageSize={105}
				page={page}
				getHref={(page) => `?page=${page}`}
				size={{
					base: "xs",
					md: "md",
				}}
				alignSelf="center"
			>
				<HStack>
					<PaginationPrevTrigger />
					<PaginationItems />
					<PaginationNextTrigger />
				</HStack>
			</PaginationRoot>
		</Stack>
	);
};
