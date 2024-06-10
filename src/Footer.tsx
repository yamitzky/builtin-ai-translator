import { Link } from "./Link";

export const Footer = () => {
	return (
		<footer className="text-center">
			<div>
				<Link href="https://github.com/yamitzky/built-in-ai-translator">
					View on GitHub
				</Link>
			</div>
			<div>
				Built by <Link href="https://twitter.com/yamitzky">@yamitzky</Link>
			</div>
		</footer>
	);
};
