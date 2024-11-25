import { Container, Flex, Text } from "@chakra-ui/react";
import type { FC } from "react";

export const Footer: FC = async () => {
	return (
		<Flex minHeight="16" borderTopWidth="1px">
			<Container display="flex" justifyContent="end" alignItems="center">
				<Text fontSize="sm" color="fg.muted">
					&copy; {new Date().getFullYear()} Jongho Hong. All rights reserved.
				</Text>
			</Container>
		</Flex>
	);
};
