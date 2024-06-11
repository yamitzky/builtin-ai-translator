/// <reference types="vite-plugin-pwa/client" />

interface Window {
	ai:
		| {
				canCreateTextSession(): Promise<"no" | "readily">;
				createTextSession(): Promise<AITextSession>;
		  }
		| undefined;
}

interface AITextSession {
	execute(text: string): Promise<string>;
	executeStreaming(text: string): Promise<AsyncIterable<string>>;
	prompt(text: string): Promise<string>;
	promptStreaming(text: string): Promise<AsyncIterable<string>>;
	destroy(): void;
}
