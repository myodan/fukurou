"use client";

import { Input, Link, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import NextLink from "next/link";
import type { FC } from "react";
import { signUp } from "~/actions/auth.action";
import { Logo } from "~/components/common/logo";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";
import { PasswordInput } from "~/components/ui/password-input";
import { toaster } from "~/components/ui/toaster";
import { signUpSchema } from "~/schemas/sign-up-schema";

const SignUpPage: FC = () => {
	const {
		form: {
			register,
			formState: { errors, isSubmitting },
		},
		handleSubmitWithAction,
	} = useHookFormAction(signUp, zodResolver(signUpSchema), {
		actionProps: {
			onSuccess: () => {
				toaster.success({ title: "회원가입 성공" });
			},
			onError: ({ error }) => {
				toaster.error({
					title: "회원가입 실패",
					description: error.serverError,
				});
			},
		},
	});

	return (
		<Stack
			as={"form"}
			gap="6"
			maxWidth="md"
			marginX="auto"
			onSubmit={handleSubmitWithAction}
		>
			<Logo />
			<Stack gap="4">
				<Field
					label="이메일"
					invalid={!!errors.email}
					errorText={errors.email?.message}
				>
					<Input {...register("email")} />
				</Field>
				<Field
					label="이름"
					invalid={!!errors.name}
					errorText={errors.name?.message}
				>
					<Input {...register("name")} />
				</Field>
				<Field
					label="비밀번호"
					invalid={!!errors.password}
					errorText={errors.password?.message}
				>
					<PasswordInput {...register("password")} />
				</Field>
				<Field
					label="비밀번호 확인"
					invalid={!!errors.confirmPassword}
					errorText={errors.confirmPassword?.message}
				>
					<PasswordInput {...register("confirmPassword")} />
				</Field>
			</Stack>
			<Button type="submit" loading={isSubmitting}>
				회원가입
			</Button>
			<Text textStyle="sm" color="fg.muted" textAlign="center">
				이미 계정이 있으신가요?{" "}
				<Link variant="underline" asChild>
					<NextLink href="/sign-in">로그인</NextLink>
				</Link>
			</Text>
		</Stack>
	);
};

export default SignUpPage;
