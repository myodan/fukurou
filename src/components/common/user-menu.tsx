"use client";

import { HStack, Stack, StackSeparator, Text } from "@chakra-ui/react";
import { type FC, useState } from "react";
import { signOut } from "~/actions/auth.action";
import type { Session } from "~/lib/auth";
import { ColorModeSegment } from "../color-mode-segment";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { LinkButton } from "../ui/link-button";
import {
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverRoot,
	PopoverTrigger,
} from "../ui/popover";

type UserMenuProps = Readonly<{
	session: Session | null;
}>;

export const UserMenu: FC<UserMenuProps> = ({ session }) => {
	const [open, setOpen] = useState(false);

	return (
		<HStack>
			{session ? (
				<PopoverRoot open={open} onOpenChange={({ open }) => setOpen(open)}>
					<PopoverTrigger>
						<Avatar src={session.user.image || undefined} shape="rounded" />
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverBody padding="2">
							<Stack separator={<StackSeparator />}>
								<HStack justifyContent="space-between">
									<Stack gap="0" paddingX="2" paddingY="1">
										<Text>{session.user.name}</Text>
										<Text fontSize="sm" color="fg.muted">
											{session.user.email}
										</Text>
									</Stack>
									<Button
										size="xs"
										variant="outline"
										onClick={async () => await signOut()}
									>
										로그아웃
									</Button>
								</HStack>
								<Stack>
									<LinkButton
										href="/my"
										variant="ghost"
										size="sm"
										justifyContent="start"
										paddingX="2"
										onClick={() => setOpen(false)}
									>
										마이페이지
									</LinkButton>
									<LinkButton
										href="/account"
										variant="ghost"
										size="sm"
										justifyContent="start"
										paddingX="2"
										onClick={() => setOpen(false)}
									>
										계정
									</LinkButton>
								</Stack>
								<HStack justifyContent="space-between">
									<Text paddingX="2" paddingY="1">
										테마
									</Text>
									<ColorModeSegment />
								</HStack>
							</Stack>
						</PopoverBody>
					</PopoverContent>
				</PopoverRoot>
			) : (
				<>
					<LinkButton href="/sign-in">로그인</LinkButton>
					<LinkButton href="/sign-up">회원가입</LinkButton>
				</>
			)}
		</HStack>
	);
};
