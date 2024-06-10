# AI Translator using Chrome's built-in LLM

ref https://developer.chrome.com/docs/ai/built-in

Demo site of Chrome's built-in AI, Gemini Nano.

- Install Chrome 127 or later ([Chrome Canary](https://www.google.com/chrome/canary/))
- Enable chrome://flags/#prompt-api-for-gemini-nano
- Enable chrome://flags/#optimization-guide-on-device-model
- Click Optimization Guide On Device Model in chrome://components/
- Wait for the model to download

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind
- Chrome's built-in LLM (for translation)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yamitzky/ai-translator.git
   ```

2. Install dependencies:

   ```bash
   cd ai-translator
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

## License

This project is licensed under the MIT License.