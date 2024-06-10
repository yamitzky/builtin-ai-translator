import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function App() {
	return (
		<div className="max-w-[1024px] p-8 mx-auto space-y-8">
			<Header />
			<Content />
			<Footer />
		</div>
	);
}
