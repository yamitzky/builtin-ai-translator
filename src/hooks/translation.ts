import { useDeferredValue, useEffect, useState } from "react";
import { useCanUseAI } from "./ai";

/**
 * Convert a single value to an async iterable
 */
async function* toAsyncIterable<T>(iterable: T): AsyncIterable<T> {
	yield iterable;
}

async function translateText(
	session: AITextSession,
	text: string,
	fromLang: string,
	toLang: string,
	useStream: boolean,
): Promise<AsyncIterable<string>> {
	let prompt = fromLang
		? `Translate following text from ${fromLang} to ${toLang}.`
		: `Translate following text to ${toLang}.`;

	prompt += `\n${text}`;
	console.info(prompt);
	if (useStream) {
		return await session.promptStreaming(prompt);
	}

	// match the type of the result with the stream
	const result = await session.prompt(prompt);
	return toAsyncIterable(result);
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
		if (!canUseAI) {
			return;
		}

		let session: AITextSession | undefined;
		async function translate() {
			session = await window?.ai?.createTextSession();
			if (!deferredText || !session) {
				return;
			}

			setIsLoading(true);
			try {
				const stream = await translateText(
					session,
					deferredText,
					fromLang,
					toLang,
					useStream,
				);
				for await (const chunk of stream) {
					setTranslatedText(chunk);
				}
			} catch (e: unknown) {
				if (e instanceof Error) {
					console.error(e);
				}
			} finally {
				setIsLoading(false);
			}
		}
		translate();
		return () => {
			session?.destroy();
		};
	}, [deferredText, toLang, fromLang, useStream, canUseAI]);

	return { isLoading, translatedText, error };
}
