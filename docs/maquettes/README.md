# Maquettes Tomodachi

Les 40 écrans dessinés dans Claude Design, copiés ici comme spécification pour coder les interfaces web et mobile.

Ces fichiers `.dc.html` sont faits pour le canvas Claude Design : ils ne s'ouvrent pas tels quels dans un navigateur (runtime `support.js` et icônes hébergées absents). Lis-les comme du code source : structure, textes, classes de `tomo.css` et logique d'interaction dans le bloc `<script>`.

| Page | Écrans |
| --- | --- |
| Onboarding | `Splash`, `Main` (Bienvenue), `Inscription`, `Verification`, `Connexion`, `DeuxFacteurs`, `MotDePasse`, `Classe`, `Interets`, `PremiersNakama` |
| Feed et publications | `Feed`, `Publication`, `Composer`, `Explorer`, `Notifications`, `NiveauSup` |
| Profil et animes | `Profil`, `ProfilMembre`, `ModifierProfil`, `Watchlist`, `FicheAnime`, `Cartes`, `Boutique`, `Parametres` |
| Communauté | `Guild`, `Guilds`, `GuerreGuilds`, `Arc`, `Quiz`, `QuizResultat`, `Senpai`, `Affinites` |
| Messages et temps réel | `Messages`, `Conversation`, `AppelVocal`, `AppelVideo`, `WatchParty`, `Live` |
| Modération | `Signaler`, `Avertissement` |

Correspondance des classes de `tomo.css` vers Tailwind / NativeWind :

| Maquette | Tailwind |
| --- | --- |
| `.card` | `rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface p-3.5` |
| `.btn.p` | `rounded-lg border-b-4 border-primary-depth bg-primary text-on-primary text-button` |
| `.btn.s` | `rounded-lg border-b-4 border-sakura-depth bg-sakura text-on-sakura text-button` |
| `.btn.g` | `rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface text-primary` |
| `.chip.on` | `rounded-pill bg-primary text-on-primary` |
| `.badge.b-gold` | `rounded-sm bg-gold-soft text-gold-ink text-caption` |
| `.muted` | `text-ink-muted` |

Les icônes `i-<nom>` sont des icônes Phosphor en graisse Bold (`@phosphor-icons/react` sur le web, `phosphor-react-native` sur le mobile), Fill pour l'onglet actif.

Les pseudos, animes, chiffres et le nom de l'arc sont des exemples inventés.
