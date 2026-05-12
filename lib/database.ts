import { neon } from "@neondatabase/serverless"

if (!process.env.POSTGRES_URI) {
    throw new Error("DATABASE_URI is not defined")
}

export const sql = neon(process.env.POSTGRES_URI)

export async function query<T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
): Promise<T[]> {
    return sql(strings, ...values) as Promise<T[]>
}
