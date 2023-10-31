import { getServerSession } from "next-auth"

import options from "./options"

export const getServerAuthSession = () => getServerSession(options)
