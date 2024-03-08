import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import config from "../src/aws-exports";
import { MapProvider } from "react-map-gl";

Amplify.configure(config);

export default function App({ Component, pageProps }) {
	console.log(Amplify.configure(config));
	return (
		<MapProvider>
			<Component {...pageProps} />
		</MapProvider>
	);
}
