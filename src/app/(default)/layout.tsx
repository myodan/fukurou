import { Container, Stack } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { Header } from "~/components/common/header";

type DefaultLayoutProps = Readonly<{
	children: ReactNode;
}>;

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<Stack minHeight="vh" gap="4">
			<Header />
			<Container>{children}</Container>
		</Stack>
	);
};

export default DefaultLayout;
