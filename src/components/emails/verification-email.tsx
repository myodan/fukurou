import type { FC } from "react";

type VerificationEmailTemplateProps = Readonly<{
	url: string;
}>;

export const VerificationEmailTemplate: FC<VerificationEmailTemplateProps> = ({
	url,
}) => {
	return (
		<div>
			<a href={url}>이메일 인증</a>
		</div>
	);
};
