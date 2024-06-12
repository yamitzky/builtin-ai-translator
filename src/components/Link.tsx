export const Link = ({
	href,
	children,
}: { href: string; children: React.ReactNode }) => {
	return (
		<a className="text-blue-500 hover:text-blue-600" href={href}>
			{children}
		</a>
	);
};
