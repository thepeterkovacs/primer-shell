import { rootRouter } from "api/root"
import { Context } from "api/trpc"

const trpcServer = ({ headers, session }: Context) => {
	return rootRouter.createCaller({ headers, session })
}

export default trpcServer
