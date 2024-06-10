type Props = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	children: React.ReactNode;
};

export const Checkbox: React.FC<Props> = ({ checked, onChange, children }) => {
	return (
		<label>
			<input
				type="checkbox"
				className="mr-2"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			{children}
		</label>
	);
};
