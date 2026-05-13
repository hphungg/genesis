import { InferSelectModel, relations, sql } from "drizzle-orm"
import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core"

export const user = pgTable("user", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar().notNull(),
})

export const set = pgTable("set", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull().default("New Set"),
    description: text("description").notNull().default(""),
    setType: varchar("set_type", { length: 50 }).notNull().default("custom"),
    coverId: varchar("cover_id", { length: 255 }),
    tags: text("tags")
        .array()
        .notNull()
        .default(sql`'{}'::text[]`),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const cards = pgTable("cards", {
    id: varchar("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    point: integer("point").notNull().default(0),
    effect: text("effect").notNull().default(""),
    type1: varchar("type_1", { length: 100 }).notNull(),
    type2: varchar("type_2", { length: 100 }),
    type3: varchar("type_3", { length: 100 }),
    attribute: varchar("attribute", { length: 100 }),
    atk: integer("atk"),
    def: integer("def"),
    level: integer("level"),
})

export const setCards = pgTable(
    "set_cards",
    {
        setId: integer("set_id")
            .notNull()
            .references(() => set.id, { onDelete: "cascade" }),
        cardId: varchar("card_id")
            .notNull()
            .references(() => cards.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.setId, t.cardId] }),
    }),
)

export const setRelations = relations(set, ({ many }) => ({
    setCards: many(setCards),
}))

export const cardsRelations = relations(cards, ({ many }) => ({
    setCards: many(setCards),
}))

export const setCardsRelations = relations(setCards, ({ one }) => ({
    set: one(set, {
        fields: [setCards.setId],
        references: [set.id],
    }),
    card: one(cards, {
        fields: [setCards.cardId],
        references: [cards.id],
    }),
}))

export type Card = InferSelectModel<typeof cards>
export type Set = InferSelectModel<typeof set>
