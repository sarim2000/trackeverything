// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { theme } from "@/lib/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { redirect } from "next/navigation";
import "@mantine/core/styles.css";
import Structure from "@/components/ui/structure";

export const metadata = {
	title: "My tracker app",
	description: "working hopefully",
};

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const user = await getLoggedInUser();
	if (!user) redirect("/signup");

	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="dark">
					<Structure>{children}</Structure>
				</MantineProvider>
			</body>
		</html>
	);
}
