import type { Metadata } from 'next';
import { anime, animes, featuredAnime as f } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import { Badge, Button, IconButton, List, ListItem, Note, Poster, Tile } from '@/components/ui';

export const metadata: Metadata = { title: 'Fiche anime' };
export const instant = false;

export function generateStaticParams() {
  return animes.map((a) => ({ id: a.id }));
}

export default async function FicheAnime({ params }: PageProps<'/anime/[id]'>) {
  const a = anime((await params).id);
  // Seule la fiche de Lames du crépuscule est détaillée dans les maquettes.
  const isFeatured = a.id === f.id;
  return (
    <>
      <Poster
        tone={a.tone}
        free
        className="h-[250px] shrink-0 flex-col items-stretch justify-between rounded-none p-0 lg:mt-4 lg:rounded-xl"
      >
        <div className="relative z-10 flex min-h-[52px] items-center px-2 pt-0.5 pb-1.5">
          <IconButton
            icon="arrow-left"
            label="Retour"
            href="/watchlist"
            className="rounded-pill bg-scrim/25"
          />
          <span className="flex-1" />
          <IconButton icon="share-network" label="Partager" className="rounded-pill bg-scrim/25" />
        </div>
        <div className="relative z-10 flex flex-col gap-1 px-5 pb-[18px] text-left">
          {isFeatured && (
            <Badge tone="live" className="self-start">
              {f.nextEpisode}
            </Badge>
          )}
          <h1 className="text-title-1">{a.title}</h1>
          <p className="text-body-sm font-semibold opacity-90">
            {f.year} · {a.episodes} épisodes · {f.genres}
          </p>
        </div>
      </Poster>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-4 pb-6">
        <div className="flex gap-4 text-body-sm">
          <span className="flex items-center gap-1">
            <Icon name="star" fill size={18} className="text-gold-depth" />
            <b className="font-black">{f.rating}</b>
            <span className="text-ink-muted">/ 5</span>
          </span>
          <span>
            <b className="font-black tabular-nums">{f.followers}</b>{' '}
            <span className="text-ink-muted">nakama le suivent</span>
          </span>
        </div>
        <div className="flex gap-2">
          <Button href="/watchlist" icon="check" className="flex-1">
            En cours · ép. {f.currentEpisode}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            icon="bookmark-simple"
            iconFill
            aria-label="Retirer de la watchlist"
          />
        </div>
        <Note tone="sakura" icon="eye-slash">
          Spoilers masqués au-delà de l&apos;épisode {f.currentEpisode}
        </Note>
        <SegTabs tabs={['Épisodes', 'Discussions', 'Fan art']} label="Contenu de l'anime" />
        <List>
          {f.episodeList.map((e) => {
            const inner = (
              <>
                {e.status === 'seen' && (
                  <Tile icon="check" tone="success-ok" size={36} round iconSize={20} />
                )}
                {e.status === 'party' && (
                  <Tile icon="popcorn" tone="sakura-solid" size={36} round />
                )}
                {e.status === 'locked' && <Tile icon="lock-simple" tone="muted" size={36} round />}
                <span className="flex flex-1 flex-col gap-1">
                  <b
                    className={`text-body-sm font-extrabold ${e.status === 'locked' ? 'text-ink-muted' : ''}`}
                  >
                    Ép. {e.number} · {e.title}
                  </b>
                  <span
                    className={`text-caption ${e.status === 'party' ? 'font-extrabold text-sakura' : 'text-ink-muted'}`}
                  >
                    {e.note}
                  </span>
                </span>
              </>
            );
            return e.status === 'party' ? (
              <ListItem key={e.number} href="/watch-party" chevron>
                {inner}
              </ListItem>
            ) : (
              <ListItem key={e.number}>{inner}</ListItem>
            );
          })}
        </List>
      </main>
    </>
  );
}
