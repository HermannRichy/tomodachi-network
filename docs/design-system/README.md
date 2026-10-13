# Tomodachi

Le design system du réseau social des otakus : chaleureux, ludique, à relief marqué, pensé pour le mobile d'abord, en clair comme en sombre.

## Principes

- **On est dans l'univers.** Chaque écran parle le langage otaku : guilds, nakama, arcs, senpai et kohai, EXP. Le vocabulaire fait partie du design.
- **Tout se touche.** Boutons et cartes ont un relief marqué : un bord inférieur plus foncé de `depth-md` (4px). À l'appui, le relief disparaît et l'élément descend de 4px, comme une touche qu'on enfonce.
- **La progression se voit.** Niveaux, EXP et défis sont toujours affichés en `gold`, la couleur de la récompense.
- **Lisible avant tout.** Texte à 4,5:1 minimum dans les deux thèmes, cibles tactiles de 44px minimum.

## Voix

Tutoiement, phrases courtes, ton complice. Les termes japonais sont courants et bien orthographiés (nakama, senpai, kohai, sugoi, kawaii). Pas de jargon technique face à l'utilisateur.

| Plutôt | Que |
| --- | --- |
| Rejoindre la bataille | Participer à l'événement |
| Toucher pour révéler | Cliquez ici pour afficher le contenu masqué |
| Tes nakama | Vos abonnés |
| Kami-sama a parlé | Annonce de l'administration |

## Couleurs

- `primary` (indigo) est la couleur de marque : actions principales, liens, onglet actif. Une seule action `primary` par écran.
- `sakura` (rose) est l'accent communautaire : guilds, watch party, réactions.
- `gold` porte la progression et les récompenses : EXP, niveaux, titres, auréole de Kami-sama.
- `success` signale le visionnage en cours, les validations et les membres en ligne.
- `danger` est réservé aux erreurs et aux sanctions de modération.
- `slime` et `slime-depth` sont réservés à la mascotte.
- Chaque couleur pleine a son `-depth` (relief), son `-soft` (fond teinté), son `-ink` (texte sur le fond teinté) et son `on-` (texte sur la couleur pleine). On ne pose jamais de texte gris sur un fond coloré.

## Typographie

Une seule famille, **Nunito** (Google Fonts, graisses 600 à 900), ronde et très lisible en petite taille. Les titres sont en 800–900, le texte courant en 600 pour garder le côté dodu. Styles : `display`, `title-1`, `title-2`, `title-3`, `body`, `body-sm`, `button`, `label`, `caption`.

## Iconographie

**Phosphor Icons**, graisse **Bold** pour la cohérence avec Nunito 800. Graisse **Fill** pour l'état actif de la barre de navigation. Taille 24px dans la navigation, 20px dans les boutons, 18px dans les compteurs. Les icônes prennent la couleur du texte qui les accompagne. Pas d'émoji dans l'interface. La librairie complète est disponible en React Native (`phosphor-react-native`) et en web (`@phosphor-icons/react`) ; le groupe Icons ici en montre une sélection.

## Relief

| Élément | Bordure | Relief |
| --- | --- | --- |
| Bouton plein | aucune | `depth-md` dans la couleur `-depth` |
| Bouton secondaire, carte | `border-width` en `border` | `depth-md` en `border-depth` |
| En-tête coloré | aucune | `depth-lg` dans la couleur `-depth` |
| Bulle de chat envoyée | aucune | `depth-sm` en `primary-depth` |

Pas d'ombres portées : le relief vient uniquement du bord inférieur.

## Formes et espacements

Rayons généreux : `radius-lg` (18px) pour les cartes et boutons, `radius-pill` pour les barres et onglets. Grille de 4px ; marge d'écran `space-4` (16px), écart entre sections `space-5` (24px).

## Mascotte

Kami-sama, un slime bleu (`slime`, `slime-depth`) avec une auréole `gold`, incarne l'administration du réseau. Il apparaît dans l'accueil, les annonces officielles et les états vides. Le design est original et ne doit rien emprunter à un personnage existant.

## Modes clair et sombre

Les deux thèmes sont définis dès le départ dans les tokens. En sombre, les couleurs pleines s'éclaircissent et le texte posé dessus devient foncé (`on-primary`, `on-sakura`) pour garder le contraste.
