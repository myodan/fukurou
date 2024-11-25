"use client";

import { HStack, Input, Link, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import NextLink from "next/link";
import type { FC } from "react";
import { signIn } from "~/actions/auth.action";
import { Logo } from "~/components/common/logo";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Field } from "~/components/ui/field";
import { PasswordInput } from "~/components/ui/password-input";
import { toaster } from "~/components/ui/toaster";
import { signInSchema } from "~/schemas/sign-in-schema";

const SignInPage: FC = () => {
	const {
		form: {
			register,
			formState: { errors, isSubmitting },
		},
		handleSubmitWithAction,
	} = useHookFormAction(signIn, zodResolver(signInSchema), {
		actionProps: {
			onSuccess: () => {
				toaster.success({ title: "로그인 성공" });
			},
			onError: ({ error }) => {
				toaster.error({ title: "로그인 실패", description: error.serverError });
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
					label="비밀번호"
					invalid={!!errors.password}
					errorText={errors.password?.message}
				>
					<PasswordInput {...register("password")} />
				</Field>
			</Stack>
			<HStack justifyContent="space-between">
				<Checkbox>자동 로그인</Checkbox>
				<Link textStyle="sm" asChild>
					<NextLink href="/forget-password">비밀번호를 잊으셨나요?</NextLink>
				</Link>
			</HStack>
			<Button type="submit" loading={isSubmitting}>
				로그인
			</Button>
			<Text textStyle="sm" color="fg.muted" textAlign="center">
				아직 계정이 없으신가요?{" "}
				<Link variant="underline" asChild>
					<NextLink href="/sign-up">회원가입</NextLink>
				</Link>
			</Text>
		</Stack>
	);
};

export default SignInPage;
