import { z } from 'zod';

/** Réactions thématiques à la place du simple like. */
export const ReactionKind = z.enum(['sugoi', 'kawaii', 'nani']);
export type ReactionKind = z.infer<typeof ReactionKind>;

/** Un spoiler est toujours lié à un anime et à un épisode. */
export const Spoiler = z.object({
  animeId: z.string(),
  episode: z.number().int().min(1),
});
export type Spoiler = z.infer<typeof Spoiler>;

export const CreatePostInput = z.object({
  text: z.string().min(1).max(500),
  mediaIds: z.array(z.string()).max(4).default([]),
  animeIds: z.array(z.string()).max(3).default([]),
  hashtags: z.array(z.string().max(40)).max(10).default([]),
  spoiler: Spoiler.nullable().default(null),
  visibility: z.enum(['public', 'nakama', 'guild']).default('public'),
});
export type CreatePostInput = z.infer<typeof CreatePostInput>;

export const Post = z.object({
  id: z.string(),
  authorId: z.string(),
  text: z.string(),
  mediaUrls: z.array(z.url()),
  animeIds: z.array(z.string()),
  hashtags: z.array(z.string()),
  spoiler: Spoiler.nullable(),
  visibility: z.enum(['public', 'nakama', 'guild']),
  reactionCounts: z.record(ReactionKind, z.number().int().min(0)),
  commentCount: z.number().int().min(0),
  repostCount: z.number().int().min(0),
  createdAt: z.iso.datetime(),
});
export type Post = z.infer<typeof Post>;
