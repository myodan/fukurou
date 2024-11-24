import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { FC, ReactNode } from "react";
import { Provider } from "~/components/ui/provider";
import { Toaster } from "~/components/ui/toaster";

const pretendard = localFont({
	src: "./fonts/PretendardVariable.woff2",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Fukurou",
};

export const viewport: Viewport = {
	userScalable: false,
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className={pretendard.className}>
				<Provider>
					{children}
					<Toaster />
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
