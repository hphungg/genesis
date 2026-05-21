export const TYPE_OPTIONS = ["Monster", "Spell", "Trap"]

export const MONSTER_RACES = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Dinosaur",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
]
export const MONSTER_SUBTYPES = [
    "Normal",
    "Effect",
    "Fusion",
    "Synchro",
    "Xyz",
    "Tuner",
    "Flip",
]
export const SPELL_SUBTYPES = [
    "Normal",
    "Continuous",
    "Quick-Play",
    "Field",
    "Equip",
    "Ritual",
]
export const TRAP_SUBTYPES = ["Normal", "Continuous", "Counter"]

export const ATTRIBUTES = ["Dark", "Light", "Earth", "Water", "Fire", "Wind"]

export const LEVELS = Array.from({ length: 12 }, (_, index) =>
    String(index + 1),
)

export const RULES_MARKDOWN = `1. Không có **Link/Pendulum/Ritual** monsters. Sử dụng sân đấu truyền thống (không có Extra Monster Zone và Pendulum Zone).
2. Sử dụng **card pool** (bể bài) **giới hạn**, chỉ bao gồm các lá bài có mặt trong các gói bài được hiển thị.
3. Banlist truyền thống không được áp dụng, thay vào đó, mỗi lá bài giờ đây sẽ có một giá trị điểm dựa trên sức mạnh của nó. Giá trị này sẽ được cập nhật định kỳ dựa vào meta.
4. Bộ bài được xây dựng dựa trên hệ thống điểm: Tổng điểm của toàn bộ lá bài trong bộ bài (bao gồm cả **Main Deck**, **Extra Deck** và **Side Deck**) không được vượt quá 100 điểm. Các lá bài trong card pool đều được thêm tối đa 3 copy, miễn là không vượt quá giới hạn điểm cho phép.
5. Toàn bộ luật thi đấu còn lại dựa trên luật thi đấu Yu-Gi-Oh! thông thường.`
