import { InferSelectModel, relations, sql } from "drizzle-orm"
import {
    integer,
    pgTable,
    pgEnum,
    primaryKey,
    serial,
    text,
    timestamp,
    varchar,
    uuid,
} from "drizzle-orm/pg-core"

export const sets = pgTable("sets", {
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
    point: integer("point").default(0),
    effect: text("effect").notNull().default(""),
    type1: varchar("type_1", { length: 100 }).notNull(),
    type2: varchar("type_2", { length: 100 }),
    type3: varchar("type_3", { length: 100 }),
    attribute: varchar("attribute", { length: 100 }),
    atk: integer("atk"),
    def: integer("def"),
    level: integer("level"),
})

export const decks = pgTable("decks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("user_id").notNull(),
    name: varchar("name", { length: 255 }).notNull().default("New Deck"),
    coverId: varchar("cover_id", { length: 255 }),
    points: integer("points").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const setCards = pgTable(
    "set_cards",
    {
        setId: integer("set_id")
            .notNull()
            .references(() => sets.id, { onDelete: "cascade" }),
        cardId: varchar("card_id")
            .notNull()
            .references(() => cards.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.setId, t.cardId] }),
    }),
)

export const deckSection = pgEnum("deck_section", ["main", "extra", "side"])

export const deckCards = pgTable(
    "deck_cards",
    {
        id: serial().primaryKey(),
        deckId: integer("deck_id")
            .notNull()
            .references(() => decks.id, { onDelete: "cascade" }),
        cardId: varchar("card_id")
            .notNull()
            .references(() => cards.id, { onDelete: "cascade" }),
        section: deckSection("section").notNull().default("main"),
    },
)

export const decksRelations = relations(decks, ({ many }) => ({
    deckCards: many(deckCards),
}))

export const setRelations = relations(sets, ({ many }) => ({
    setCards: many(setCards),
}))

export const cardsRelations = relations(cards, ({ many }) => ({
    setCards: many(setCards),
}))

export const deckCardsRelations = relations(deckCards, ({ one }) => ({
    deck: one(decks, {
        fields: [deckCards.deckId],
        references: [decks.id],
    }),
    card: one(cards, {
        fields: [deckCards.cardId],
        references: [cards.id],
    }),
}))

export const setCardsRelations = relations(setCards, ({ one }) => ({
    set: one(sets, {
        fields: [setCards.setId],
        references: [sets.id],
    }),
    card: one(cards, {
        fields: [setCards.cardId],
        references: [cards.id],
    }),
}))

export type Cards = InferSelectModel<typeof cards>
export type Decks = InferSelectModel<typeof decks>
export type Sets = InferSelectModel<typeof sets>
