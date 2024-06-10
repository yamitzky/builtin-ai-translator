import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { Loading } from "./Loading";
import { Select } from "./Select";
import { LANGUAGES } from "./constants";
import { useTranslation } from "./hooks";

export default function App() {
	const [text, setText] = useState("");
	const [toLang, setToLang] = useState("Japanese");
	const [fromLang, setFromLang] = useState("");
	const [useStream, setUseStream] = useState(true);
	const { isLoading, translatedText, error } = useTranslation(
		text,
		fromLang,
		toLang,
		useStream,
	);

	return (
		<div className="max-w-[1024px] p-8 mx-auto">
			<div className="flex space-x-4">
				<div className="flex-1">
					<div className="border border-gray-300 rounded-md p-4 h-full">
						<div className="flex items-center mb-2">
							<div className="ml-auto">
								<Select
									onChange={(value) => setFromLang(value)}
									value={fromLang}
								>
									<option value="">Detect language</option>
									{LANGUAGES.map((lang) => (
										<option key={lang} value={lang}>
											{lang}
										</option>
									))}
								</Select>
							</div>
						</div>
						{!error ? (
							<textarea
								className="w-full h-32 p-2 border border-gray-300 rounded-md"
								placeholder="Enter text"
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
						) : (
							<div className="w-full h-32 p-2 border border-gray-300 rounded-md">
								<p className="text-red-500">{error}</p>
							</div>
						)}
					</div>
				</div>
				<div className="flex-1">
					<div className="border border-gray-300 rounded-md p-4 h-full flex flex-col">
						<div className="flex items-center mb-2">
							<div className="ml-auto space-x-2">
								<Checkbox checked={useStream} onChange={setUseStream}>
									Streaming result
								</Checkbox>
								<Select onChange={(value) => setToLang(value)} value={toLang}>
									{LANGUAGES.map((lang) => (
										<option key={lang} value={lang}>
											{lang}
										</option>
									))}
								</Select>
							</div>
						</div>
						<div className="w-full flex-1 p-2 border border-gray-300 rounded-md">
							<div className="relative h-full">
								<div className="whitespace-pre-wrap">{translatedText}</div>
								{isLoading && (
									<div className="absolute bottom-2 right-2">
										<Loading />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
