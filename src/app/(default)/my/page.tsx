import {
	Flex,
	For,
	FormatNumber,
	HStack,
	Heading,
	Image,
	Stack,
	StackSeparator,
	Text,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { getSession } from "~/actions/auth.action";
import { getRecentlyViewHistories } from "~/actions/view-histories.action";
import { LinkButton } from "~/components/ui/link-button";
import { Tag } from "~/components/ui/tag";

const MyPage: FC = async () => {
	const session = await getSession();

	if (!session) {
		return redirect("/sign-in");
	}

	const recentlyViewHistories = await getRecentlyViewHistories({
		userId: session.user.id,
	});

	return (
		<Stack separator={<StackSeparator />}>
			<HStack justifyContent="space-between">
				<Heading>최근 본 웹툰</Heading>
				<Text color="fg.muted">
					총 <FormatNumber value={recentlyViewHistories.length} />개
				</Text>
			</HStack>
			<For each={recentlyViewHistories}>
				{(viewHistory) => (
					<HStack gap="4" alignItems="stretch">
						<NextLink href={`/webtoons/${viewHistory.webtoon.id}`} passHref>
							<Flex
								height={{ base: "32", md: "48" }}
								aspectRatio={3 / 4}
								position="relative"
							>
								<Image rounded="md" objectFit="cover" asChild>
									<NextImage
										src={viewHistory.webtoon.thumbnailUrl}
										alt="thumbnail"
										fill
									/>
								</Image>
							</Flex>
						</NextLink>
						<Flex
							flexBasis="full"
							flexDirection="column"
							justifyContent="space-between"
							gap="4"
						>
							<Stack gap="1">
								<NextLink href={`/webtoons/${viewHistory.webtoon.id}`} passHref>
									<Heading lineClamp="1">{viewHistory.webtoon.title}</Heading>
								</NextLink>
								<Text textStyle="sm" lineClamp="2">
									{viewHistory.webtoon.synopsis}
								</Text>
								<HStack hideBelow="md" flexWrap="wrap">
									<For each={viewHistory.webtoon.tags}>
										{(tag) => (
											<NextLink href={`/tags/${tag.id}`} passHref>
												<Tag key={tag.id}>{tag.name}</Tag>
											</NextLink>
										)}
									</For>
								</HStack>
							</Stack>
							<HStack justifyContent="end">
								<LinkButton
									href={`/webtoons/${viewHistory.webtoon.id}/${viewHistory.episode.episodeNumber}`}
									variant="subtle"
								>
									<Text>{viewHistory.episode.episodeNumber}화 다시보기</Text>
								</LinkButton>
								<LinkButton
									href={`/webtoons/${viewHistory.webtoon.id}/${viewHistory.episode.episodeNumber + 1}`}
								>
									다음화 보기
								</LinkButton>
							</HStack>
						</Flex>
					</HStack>
				)}
			</For>
		</Stack>
	);
};

export default MyPage;
