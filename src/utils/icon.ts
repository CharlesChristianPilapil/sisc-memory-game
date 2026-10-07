import {
    Anchor,
    Aperture,
    Bell,
    Camera,
    Cloud,
    Compass,
    Crown,
    Diamond,
    Feather,
    Flame,
    Flower2,
    Headphones,
    Heart,
    Moon,
    Sparkles,
    Star,
    Sun,
    Zap,
    type LucideIcon,
} from "lucide-react";

export const CARD_ICONS = {
    aperture: Aperture,
    bolt: Zap,
    compass: Compass,
    diamond: Diamond,
    flower: Flower2,
    headphones: Headphones,
    moon: Moon,
    spark: Sparkles,
    sun: Sun,
    star: Star,
    heart: Heart,
    anchor: Anchor,
    bell: Bell,
    camera: Camera,
    cloud: Cloud,
    crown: Crown,
    feather: Feather,
    flame: Flame,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof CARD_ICONS;

export const ICON_NAMES = Object.keys(CARD_ICONS) as IconName[];
