import { Code } from "@chakra-ui/react";
import type { FC } from "react";
import { getSession } from "~/actions/auth.action";

const RootPage: FC = async () => {
	const session = await getSession();

	return (
		<Code as="pre" padding="4">
			{JSON.stringify(session, null, 2)}
		</Code>
	);
};

export default RootPage;
