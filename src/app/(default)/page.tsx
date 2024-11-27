import { redirect } from "next/navigation";
import type { FC } from "react";

const RootPage: FC = async () => {
	return redirect("/webtoons");
};

export default RootPage;
