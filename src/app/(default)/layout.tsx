import { Container, Stack } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { Footer } from "~/components/common/footer";
import { Header } from "~/components/common/header";

type DefaultLayoutProps = Readonly<{
	children: ReactNode;
}>;

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<Stack gap="4">
			<Stack minHeight="vh" gap="4">
				<Header />
				<Container>{children}</Container>
			</Stack>
			<Footer />
		</Stack>
	);
};

export default DefaultLayout;
