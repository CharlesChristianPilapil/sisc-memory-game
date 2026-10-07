import { ICON_NAMES, type IconName } from "./icon";

export type Card = {
    id: number;
    icon: IconName;
    matched: boolean;
};

const shuffle = <T>(items: T[]): T[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

export function createDeck(pairCount: number): Card[] {
    if (pairCount > ICON_NAMES.length) {
        throw new Error(`Only ${ICON_NAMES.length} unique icons available`);
    }

    const chosen = shuffle(ICON_NAMES).slice(0, pairCount);

    return shuffle([...chosen, ...chosen]).map((icon, id) => ({
        id,
        icon,
        matched: false,
    }));
}
