import { theme } from "@/lib/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
	title: "TrackeEverything",
	description: "Track your books, movies, tv and games all in one place",
};

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const user = await getLoggedInUser();
	if (user) {
		redirect("/book");
	}
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="dark">
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
