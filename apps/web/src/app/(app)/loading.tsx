import { PostSkeleton, Skeleton } from '@/components/ui';

// Affiché pendant le chargement d'un écran (quand les données viendront de l'API).
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Chargement"
      className="flex flex-1 flex-col gap-3 px-4 pt-5 pb-6"
    >
      <Skeleton className="h-24 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24 rounded-pill" />
        <Skeleton className="h-10 w-20 rounded-pill" />
        <Skeleton className="h-10 w-20 rounded-pill" />
      </div>
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}
