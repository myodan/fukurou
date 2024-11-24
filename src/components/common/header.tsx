import { Container, Flex } from "@chakra-ui/react";
import type { FC } from "react";
import { getSession } from "~/actions/auth.action";
import { LogoWithLink } from "./logo";
import { UserMenu } from "./user-menu";

export const Header: FC = async () => {
	const session = await getSession();

	return (
		<Flex
			as="header"
			position="sticky"
			top="0"
			zIndex="sticky"
			minHeight="16"
			background="bg.panel"
			borderBottomWidth="1px"
		>
			<Container
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<LogoWithLink />
				<UserMenu session={session} />
			</Container>
		</Flex>
	);
};
