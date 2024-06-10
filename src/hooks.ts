import { useDeferredValue, useEffect, useState } from "react";

function useCanUseAI() {
	const [canUseAI, setCanUseAI] = useState<boolean>();

	useEffect(() => {
		async function canUseAI() {
			if (window.ai) {
				const canCreate = await window.ai.canCreateTextSession();
				setCanUseAI(canCreate !== "no");
			} else {
				setCanUseAI(false);
			}
		}
		canUseAI();
	}, []);

	return canUseAI;
}

async function translateText(
	text: string,
	fromLang: string,
	toLang: string,
	useStream: false,
): Promise<string>;
async function translateText(
	text: string,
	fromLang: string,
	toLang: string,
	useStream: true,
): Promise<AsyncIterable<string>>;
async function translateText(
	text: string,
	fromLang: string,
	toLang: string,
	useStream: boolean,
) {
	if (text) {
		const session = await window.ai?.createTextSession();
		if (session) {
			let prompt = fromLang
				? `Translate following text from ${fromLang} to ${toLang}.`
				: `Translate following text to ${toLang}.`;

			prompt += `\n${text}`;
			console.info(prompt);
			if (useStream) {
				return await session.promptStreaming(prompt);
			}
			return await session.prompt(prompt);
		}
		throw new Error("Failed to create AI session");
	}
}

export function useTranslation(
	text: string,
	fromLang: string,
	toLang: string,
	useStream: boolean,
) {
	const deferredText = useDeferredValue(text);
	const canUseAI = useCanUseAI();
	const [isLoading, setIsLoading] = useState(false);
	const [translatedText, setTranslatedText] = useState("");
	const [error, setError] = useState<string>();

	useEffect(() => {
		if (canUseAI === false) {
			setError("Please install AI extension");
		} else {
			setError(undefined);
		}
	}, [canUseAI]);

	useEffect(() => {
		async function translate() {
			if (deferredText) {
				setIsLoading(true);
				try {
					if (useStream) {
						const stream = await translateText(
							deferredText,
							fromLang,
							toLang,
							useStream,
						);
						for await (const chunk of stream) {
							setTranslatedText(chunk);
						}
						setIsLoading(false);
					} else {
						const result = await translateText(
							deferredText,
							fromLang,
							toLang,
							useStream,
						);
						setTranslatedText(result);
						setIsLoading(false);
					}
				} catch (e: unknown) {
					if (e instanceof Error) {
						setError(e.message);
						console.error(e);
					}
				} finally {
					setIsLoading(false);
				}
			}
		}
		translate();
	}, [deferredText, toLang, fromLang, useStream]);

	return { isLoading, translatedText, error };
}
