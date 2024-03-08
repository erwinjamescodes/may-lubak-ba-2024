import LubakMap from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { Auth } from "aws-amplify";
import Head from "next/head";
import { useEffect } from "react";
import useUserStore from "@/store/userStore";

export default function Home() {
	const { setCurrentUser } = useUserStore();
	useEffect(() => {
		const checkAuth = async () => {
			try {
				let data = await Auth.currentAuthenticatedUser();
				localStorage.setItem(
					"LubakToken",
					data.signInUserSession.idToken.jwtToken
				);
				setCurrentUser(data?.attributes?.email);
			} catch (error) {
				console.log("Error", error);
			}
		};
		checkAuth();
	}, []);

	return (
		<>
			<Head>
				<title>May Lubak Ba?</title>
				<meta
					name="description"
					content="Lubak Tracker App"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<div className="flex h-svh overflow-hidden">
				<Sidebar />
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<main>
						<div className="w-[100%] max-w-9xl mx-auto">
							<LubakMap />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
