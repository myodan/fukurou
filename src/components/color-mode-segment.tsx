import { ClientOnly, Skeleton } from "@chakra-ui/react";
import type { FC } from "react";
import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "./ui/color-mode";
import { SegmentedControl } from "./ui/segmented-control";

export const ColorModeSegment: FC = () => {
	const { colorMode, setColorMode } = useColorMode();

	return (
		<ClientOnly fallback={<Skeleton width="138px" height="8" />}>
			<SegmentedControl
				size="sm"
				defaultValue={colorMode}
				onValueChange={({ value }) => setColorMode(value)}
				items={[
					{
						value: "system",
						label: <LuMonitor />,
					},
					{
						value: "light",
						label: <LuSun />,
					},
					{
						value: "dark",
						label: <LuMoon />,
					},
				]}
			/>
		</ClientOnly>
	);
};
