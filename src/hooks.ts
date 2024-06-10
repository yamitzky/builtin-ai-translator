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
	deferredText: string,
	fromLang: string,
	toLang: string,
	useStream: boolean,
	onTranslated: (text: string) => void,
) {
	if (deferredText) {
		const session = await window.ai?.createTextSession();
		if (session) {
			let prompt = fromLang
				? `Translate following text from ${fromLang} to ${toLang}.`
				: `Translate following text to ${toLang}.`;

			prompt += `\n${deferredText}`;
			console.info(prompt);
			if (useStream) {
				const stream = await session?.promptStreaming(prompt);
				for await (const chunk of stream) {
					if (chunk) {
						onTranslated(chunk);
					}
				}
			} else {
				const result = await session?.prompt(prompt);
				if (result) {
					onTranslated(result);
				}
			}
		} else {
			throw new Error("Failed to create AI session");
		}
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
					translateText(
						deferredText,
						fromLang,
						toLang,
						useStream,
						setTranslatedText,
					);
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
