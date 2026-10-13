import { z } from 'zod';

export const GuildRole = z.enum(['membre', 'veteran', 'officier', 'chef']);
export type GuildRole = z.infer<typeof GuildRole>;

export const Guild = z.object({
  id: z.string(),
  name: z.string().min(3).max(32),
  description: z.string().max(280).nullable(),
  emblemColor: z.string().regex(/^#[0-9a-f]{6}$/i),
  memberCount: z.number().int().min(0),
  seasonPoints: z.number().int().min(0),
  rank: z.number().int().min(1).nullable(),
});
export type Guild = z.infer<typeof Guild>;

export const CreateGuildInput = Guild.pick({ name: true, description: true, emblemColor: true });
export type CreateGuildInput = z.infer<typeof CreateGuildInput>;
