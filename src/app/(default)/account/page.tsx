import { Code } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { getRecentlyViewedWebtoons } from "~/actions/account.action";
import { getSession } from "~/actions/auth.action";

const AccountPage: FC = async () => {
	const session = await getSession();

	if (!session) {
		return redirect("/sign-in");
	}

	const webtoons = await getRecentlyViewedWebtoons({ userId: session.user.id });

	return (
		<Code as="pre" padding="4">
			{JSON.stringify(webtoons, null, 2)}
		</Code>
	);
};

export default AccountPage;
