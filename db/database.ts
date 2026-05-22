import "dotenv/config"

import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"

let connectionString = process.env.NEXT_PUBLIC_DATABASE_URL!

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })
