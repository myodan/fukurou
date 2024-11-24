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
import { notFound, redirect } from "next/navigation";
import type { FC } from "react";
import { getSession } from "~/actions/auth.action";
import { getRecentlyViewedWebtoons } from "~/actions/my.action";
import { Button } from "~/components/ui/button";
import { Tag } from "~/components/ui/tag";

const MyPage: FC = async () => {
	const session = await getSession();

	if (!session) {
		return redirect("/sign-in");
	}

	const viewHistory = await getRecentlyViewedWebtoons({
		userId: session.user.id,
	});

	if (!viewHistory?.data) {
		return notFound();
	}

	return (
		<Stack separator={<StackSeparator />}>
			<HStack justifyContent="space-between">
				<Heading>최근 본 웹툰</Heading>
				<Text color="fg.muted">
					총 <FormatNumber value={viewHistory.data.length} />개
				</Text>
			</HStack>
			<For each={viewHistory.data}>
				{(view) => (
					<HStack gap="4" alignItems="stretch">
						<NextLink href={`/webtoons/${view.webtoon.id}`} passHref>
							<Flex
								height={{ base: "32", md: "48" }}
								aspectRatio={3 / 4}
								position="relative"
							>
								<Image rounded="md" objectFit="cover" asChild>
									<NextImage
										src={view.webtoon.thumbnailUrl}
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
								<HStack justifyContent="space-between">
									<NextLink href={`/webtoons/${view.webtoon.id}`} passHref>
										<Heading textStyle="lg">{view.webtoon.title}</Heading>
									</NextLink>
									<Text fontSize="sm" color="fg.muted" alignSelf="start">
										{new Date(view.viewedAt).toLocaleDateString()}
									</Text>
								</HStack>
								<Text textStyle="sm" lineClamp={2}>
									{view.webtoon.synopsis}
								</Text>
								<HStack hideBelow="md" flexWrap="wrap">
									<For each={view.webtoon.tags}>
										{(tag) => (
											<NextLink href={`/tags/${tag.id}`} passHref>
												<Tag key={tag.id}>{tag.name}</Tag>
											</NextLink>
										)}
									</For>
								</HStack>
							</Stack>
							<HStack justifyContent="end">
								<Button variant="subtle">
									<FormatNumber value={view.episode.episodeNumber} />화 다시보기
								</Button>
								<Button>다음화 보기</Button>
							</HStack>
						</Flex>
					</HStack>
				)}
			</For>
		</Stack>
	);
};

export default MyPage;
