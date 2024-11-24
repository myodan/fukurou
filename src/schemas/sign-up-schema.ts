import { z } from "zod";

export const signUpSchema = z
	.object({
		email: z.string().email("올바른 이메일 주소를 입력해주세요."),
		name: z
			.string()
			.min(2, "이름은 최소 2자 이상이어야 합니다.")
			.max(64, "이름은 최대 64자까지 가능합니다."),
		password: z
			.string()
			.min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
			.max(64, "비밀번호는 최대 64자까지 가능합니다.")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
				"비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.",
			),
		confirmPassword: z.string(),
	})
	.refine((value) => value.password === value.confirmPassword, {
		message: "비밀번호가 일치하지 않습니다.",
		path: ["confirmPassword"],
	});

export type SignUpInput = z.infer<typeof signUpSchema>;
