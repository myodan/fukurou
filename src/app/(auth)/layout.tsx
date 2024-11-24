import { Container, Stack } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

type AuthLayoutProps = Readonly<{
	children: ReactNode;
}>;

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	return (
		<Stack minHeight="vh" justifyContent="center" alignItems="center" gap="4">
			<Container>{children}</Container>
		</Stack>
	);
};

export default AuthLayout;
