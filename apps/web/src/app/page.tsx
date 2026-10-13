import Image from 'next/image';
import Link from 'next/link';

// Écran « Bienvenue » de la maquette (docs/maquettes/Main.dc.html), version web.
export default function Bienvenue() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <p className="max-w-72 rounded-lg border-2 border-b-4 border-border bg-surface px-4 py-3 text-[15px] leading-[21px] font-bold">
          Yo, nakama ! Moi, c&apos;est Kami-sama. Je veille sur ce monde.
        </p>
        <Image src="/kami-sama.svg" alt="Kami-sama" width={150} height={141} priority />
        <h1 className="text-display text-primary">Tomodachi</h1>
        <p className="text-body text-ink-muted">
          Trouve ta guild, tes nakama
          <br />
          et ton prochain anime.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Link
          href="/inscription"
          className="flex min-h-13 items-center justify-center rounded-lg border-b-4 border-primary-depth bg-primary px-5 text-button text-on-primary active:translate-y-1 active:border-b-0"
        >
          Créer un compte
        </Link>
        <Link
          href="/connexion"
          className="flex min-h-13 items-center justify-center rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface px-5 text-button text-primary active:translate-y-1"
        >
          J&apos;ai déjà un compte
        </Link>
      </div>
    </main>
  );
}
