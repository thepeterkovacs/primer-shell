import { createTRPCReact } from "@trpc/react-query"

import { RootRouter } from "api/root"

const trpcClient = createTRPCReact<RootRouter>({})

export default trpcClient
