import { Users, MapPin, Clock, User, Music, Utensils, Star } from "lucide-react";

export const iconMap = {
  users: Users,
  mapPin: MapPin,
  clock: Clock,
  user: User,
  music: Music,
  utensils: Utensils,
  star: Star,
} as const;

export type IconKey = keyof typeof iconMap;