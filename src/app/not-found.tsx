import type { FC } from "react";
import { LuHelpCircle } from "react-icons/lu";
import { EmptyState } from "~/components/ui/empty-state";

const NotFoundPage: FC = () => {
	return (
		<EmptyState
			icon={<LuHelpCircle />}
			title="페이지를 찾을 수 없습니다."
			description="요청하신 페이지가 존재하지 않거나 삭제되었습니다."
		/>
	);
};

export default NotFoundPage;
