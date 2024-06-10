type Props = {
	value: string;
	onChange: (value: string) => void;
	children: React.ReactNode;
};

export const Select: React.FC<Props> = ({ value, onChange, children }) => {
	return (
		<select
			className="px-2 py-1 border border-gray-300 rounded-md"
			onChange={(e) => onChange(e.target.value)}
			value={value}
		>
			{children}
		</select>
	);
};
