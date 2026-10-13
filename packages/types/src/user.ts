import { z } from 'zod';

/** Classe choisie à l'inscription : elle colore la fiche de personnage. */
export const PlayerClass = z.enum(['stratege', 'mage', 'guerrier', 'barde']);
export type PlayerClass = z.infer<typeof PlayerClass>;

export const Role = z.enum(['user', 'moderator', 'admin']);
export type Role = z.infer<typeof Role>;

export const Username = z
  .string()
  .min(3)
  .max(24)
  .regex(/^[a-z0-9_]+$/, 'Lettres minuscules, chiffres et _ uniquement');

/** Profil public d'un membre, tel que l'API le renvoie. */
export const PublicUser = z.object({
  id: z.string(),
  username: Username,
  displayName: z.string().min(1).max(40),
  bio: z.string().max(160).nullable(),
  avatarUrl: z.url().nullable(),
  playerClass: PlayerClass,
  level: z.number().int().min(1),
  exp: z.number().int().min(0),
  powerLevel: z.number().int().min(0),
  isPrivate: z.boolean(),
});
export type PublicUser = z.infer<typeof PublicUser>;

export const UpdateProfileInput = PublicUser.pick({
  displayName: true,
  bio: true,
  playerClass: true,
  isPrivate: true,
}).partial();
export type UpdateProfileInput = z.infer<typeof UpdateProfileInput>;
