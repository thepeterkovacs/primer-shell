import { AppRouter } from "@/server/api/appRouter"
import { createTRPCReact } from "@trpc/react-query"

export const trpcClient = createTRPCReact<AppRouter>({})
