import { Center, Spinner } from "@chakra-ui/react";
import type { FC } from "react";

const DefaultLoadingPage: FC = () => {
	return (
		<Center>
			<Spinner size="xl" />
		</Center>
	);
};

export default DefaultLoadingPage;
