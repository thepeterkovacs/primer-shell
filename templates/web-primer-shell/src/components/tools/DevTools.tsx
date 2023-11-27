import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import TailwindIndicator from "tools/TailwindIndicator"

export default function DevTools(): JSX.Element {
	return (
		<>
			<ReactQueryDevtools initialIsOpen={false} />
			<TailwindIndicator />
		</>
	)
}
