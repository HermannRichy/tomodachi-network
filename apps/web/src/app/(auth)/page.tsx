import { Icon } from '@/components/icon';
import { Button, Kami, Speech, TextLink, chipClass } from '@/components/ui';

// Bienvenue (maquette Main)
export default function Bienvenue() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-4 pb-10">
      <div className="flex items-center justify-between">
        <span lang="ja" className="text-label text-primary">
          友達
        </span>
        <button type="button" className={chipClass('default', true)} aria-label="Langue : français">
          <Icon name="translate" size={18} />
          FR
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
        <Speech className="max-w-[280px]">
          Yo, nakama ! Moi, c&apos;est Kami-sama. Je veille sur ce monde.
        </Speech>
        <Kami size={150} alt="Kami-sama" />
        <h1 className="text-display text-primary">Tomodachi</h1>
        <p className="text-body text-ink-muted">
          Trouve ta guild, tes nakama
          <br />
          et ton prochain anime.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <Button href="/classe" variant="discord" block icon="discord-logo">
          Continuer avec Discord
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button href="/classe" variant="secondary" icon="google-logo">
            Google
          </Button>
          <Button href="/classe" variant="secondary" icon="apple-logo">
            Apple
          </Button>
        </div>
        <Button href="/inscription" block icon="envelope-simple">
          Créer un compte avec mon email
        </Button>
        <Button href="/connexion" variant="ghost" className="self-center">
          J&apos;ai déjà un compte
        </Button>
        <p className="text-center text-caption text-ink-muted">
          En continuant, tu acceptes les <TextLink href="#cgu">CGU</TextLink> et la{' '}
          <TextLink href="#confidentialite">politique de confidentialité</TextLink>.
        </p>
      </div>
    </main>
  );
}
