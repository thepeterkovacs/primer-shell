import { rootRouter } from "api/root"
import { Context } from "api/trpc"

const trpcServer = ({ db, session }: Context) => {
	return rootRouter.createCaller({ db, session })
}

export default trpcServer
