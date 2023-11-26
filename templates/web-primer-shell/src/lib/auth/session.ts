import { getServerSession } from "next-auth"

import options from "auth/options"

export const getServerAuthSession = () => getServerSession(options)
