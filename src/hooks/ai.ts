import { useEffect, useState } from "react";

export function useCanUseAI() {
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
