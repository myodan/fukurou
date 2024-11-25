import type { FC } from "react";
import { LinkButton } from "~/components/ui/link-button";

const RootPage: FC = async () => {
	return <LinkButton href="/webtoons">웹툰</LinkButton>;
};

export default RootPage;
