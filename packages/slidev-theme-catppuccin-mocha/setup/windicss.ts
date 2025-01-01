import { resolve } from "path";
import { defineWindiSetup } from "@slidev/types";

export default defineWindiSetup(() => ({
	extract: {
		include: [resolve(__dirname, "../**/*.{vue,ts}")],
	},
	shortcuts: {
		// custom the default background
		"bg-main": "bg-[#1e1e2e] text-[#flavor.colors.text.hex]",
	},
}));
