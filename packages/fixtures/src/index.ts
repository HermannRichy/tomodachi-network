// Données d'exemple des maquettes (docs/maquettes). Pseudos, animes, guilds et chiffres sont inventés.
// Le web et le mobile les affichent en attendant les vraies réponses de l'API.

/** Indice d'une couleur d'avatar ou d'affiche : avatar-1…6, poster-1…6 dans le design system. */
export type Tone = 1 | 2 | 3 | 4 | 5 | 6;
export type PlayerClassId = 'stratege' | 'mage' | 'guerrier' | 'barde';

export interface Member {
  username: string;
  name: string;
  initial: string;
  tone: Tone;
  level: number;
  playerClass: PlayerClassId;
  online?: boolean;
}

const m = (
  username: string,
  name: string,
  tone: Tone,
  level: number,
  playerClass: PlayerClassId,
  online = false,
): Member => ({ username, name, initial: name.charAt(0), tone, level, playerClass, online });

export const members = {
  ren: m('ren_sensei', 'Ren', 5, 12, 'stratege'),
  aiko: m('aiko_art', 'Aïko', 1, 14, 'mage', true),
  kenji: m('kenji', 'Kenji', 2, 9, 'barde', true),
  yuna: m('yuna', 'Yuna', 3, 6, 'barde', true),
  sora: m('sora', 'Sora', 4, 21, 'stratege', true),
  mika: m('mika', 'Mika', 6, 2, 'mage'),
  taro: m('taro', 'Taro', 2, 1, 'guerrier'),
  hana: m('hana', 'Hana', 2, 11, 'barde'),
  kofi: m('kofi', 'Kofi', 6, 15, 'guerrier'),
  lina: m('lina', 'Lina', 3, 8, 'mage'),
} satisfies Record<string, Member>;

export type MemberId = keyof typeof members;
/** Le membre connecté dans les maquettes. */
export const me = members.ren;

export const playerClasses: {
  id: PlayerClassId;
  name: string;
  description: string;
  tone: 'primary' | 'sakura' | 'gold' | 'success';
}[] = [
  {
    id: 'stratege',
    name: 'Stratège',
    description: 'Analyses, théories, critiques détaillées.',
    tone: 'primary',
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'Fan art, AMV, créations en tout genre.',
    tone: 'sakura',
  },
  {
    id: 'guerrier',
    name: 'Guerrier',
    description: 'Quiz, défis et guerres de guilds.',
    tone: 'gold',
  },
  {
    id: 'barde',
    name: 'Barde',
    description: 'Watch parties, lives et discussions.',
    tone: 'success',
  },
];

export const className = (id: PlayerClassId) => playerClasses.find((c) => c.id === id)?.name ?? '';

// Animes

export interface Anime {
  id: string;
  title: string;
  tone: Tone;
  episodes: number;
}

export const animes: Anime[] = [
  { id: 'lames-du-crepuscule', title: 'Lames du crépuscule', tone: 1, episodes: 24 },
  { id: 'academie-hoshizora', title: 'Académie Hoshizora', tone: 2, episodes: 12 },
  { id: 'le-dernier-ronin', title: 'Le Dernier Ronin', tone: 6, episodes: 13 },
  { id: 'mecha-aurora', title: 'Mecha Aurora', tone: 3, episodes: 26 },
  { id: 'cuisine-d-edo', title: "Cuisine d'Edo", tone: 4, episodes: 12 },
  { id: 'esprits-de-kyoto', title: 'Esprits de Kyoto', tone: 5, episodes: 24 },
  { id: 'volley-kaze', title: 'Volley Kaze', tone: 6, episodes: 25 },
  { id: 'isekai-boulanger', title: 'Isekai Boulanger', tone: 2, episodes: 12 },
  { id: 'chroniques-du-shogun', title: 'Chroniques du Shogun', tone: 1, episodes: 24 },
];

export const anime = (id: string) => animes.find((a) => a.id === id) ?? animes[0]!;

export const genres = ['Shōnen', 'Isekai', 'Slice of life', 'Mecha'];

/** Fiche détaillée de l'anime mis en avant dans les maquettes. */
export const featuredAnime = {
  ...anime('lames-du-crepuscule'),
  year: 2026,
  genres: 'Shōnen, action',
  rating: '4,6',
  followers: '1 840',
  nextEpisode: 'Nouvel épisode samedi',
  currentEpisode: 8,
  episodeList: [
    { number: 8, title: 'Le serment du pont', status: 'seen' as const, note: 'Vu hier' },
    {
      number: 9,
      title: "L'ombre du mentor",
      status: 'party' as const,
      note: 'Watch party ce soir 21 h',
    },
    {
      number: 10,
      title: 'Titre masqué',
      status: 'locked' as const,
      note: 'Masqué pour éviter les spoilers',
    },
  ],
};

// Guilds

export interface Guild {
  id: string;
  name: string;
  /** null : la guild du membre connecté, affichée en sakura. */
  tone: Tone | null;
  members: number;
  points: number;
  rank: number;
  genre?: string;
}

export const guilds = {
  tengu: { id: 'tengu-club', name: 'Tengu Club', tone: 5, members: 140, points: 3120, rank: 1 },
  kitsune: {
    id: 'kitsune-clan',
    name: 'Kitsune Clan',
    tone: 1,
    members: 124,
    points: 2980,
    rank: 2,
  },
  sakura: {
    id: 'sakura-ronin',
    name: 'Sakura Ronin',
    tone: null,
    members: 86,
    points: 2340,
    rank: 3,
    genre: 'shōnen',
  },
  mecha: { id: 'mecha-pilots', name: 'Mecha Pilots', tone: 4, members: 97, points: 2100, rank: 4 },
  cuisine: {
    id: 'cuisine-anime',
    name: 'Cuisine & Anime',
    tone: 6,
    members: 42,
    points: 640,
    rank: 18,
    genre: 'Slice of life',
  },
} satisfies Record<string, Guild>;

export const myGuild = { ...guilds.sakura, online: 12, myRole: 'Vétéran' };

export const guildWar = {
  endsIn: 'Fin dans 2 j',
  timer: '1 j 22 h',
  us: { name: 'Sakura Ronin', score: 2340 },
  them: { name: 'Kitsune Clan', score: 1910 },
  trials: [
    { icon: 'question' as const, label: 'Quiz battles', us: 980, them: 720 },
    { icon: 'pencil' as const, label: 'Critiques publiées', us: 760, them: 640 },
    { icon: 'target' as const, label: "Défis de l'arc", us: 600, them: 550 },
  ],
  warriors: [
    { rank: 1, member: members.sora, points: 420 },
    { rank: 2, member: members.aiko, points: 380 },
    { rank: 7, member: members.ren, points: 190, isMe: true },
  ],
};

// Feed et publications

export interface Post {
  id: string;
  author: Member;
  ago: string;
  context: string;
  text: string;
  spoiler?: { label: string; progress: string; hidden: string };
  sugoi: number;
  comments: number;
  reposts: number;
  watchParty?: boolean;
}

export const posts: Post[] = [
  {
    id: 'twist-final',
    author: members.aiko,
    ago: 'il y a 2 h',
    context: 'Lames du crépuscule',
    text: "Cet épisode m'a retourné le cerveau. Personne n'avait vu venir le twist final.",
    spoiler: {
      label: 'Spoiler épisode 12',
      progress: "Tu en es à l'épisode 8",
      hidden: 'Le mentor était le roi démon depuis le début.',
    },
    sugoi: 128,
    comments: 24,
    reposts: 9,
  },
  {
    id: 'watch-party-ep9',
    author: members.kenji,
    ago: 'il y a 20 min',
    context: 'Guild Sakura Ronin',
    text: "Watch party ce soir 21 h pour l'épisode 9, qui est chaud ?",
    sugoi: 31,
    comments: 6,
    reposts: 2,
    watchParty: true,
  },
];

export const post = (id: string) => posts.find((p) => p.id === id) ?? posts[0]!;

export interface Comment {
  author: Member;
  ago: string;
  text: string;
  sugoi?: number;
  reacted?: boolean;
  badge?: string;
  replies?: Comment[];
}

export const comments: Comment[] = [
  {
    author: members.sora,
    ago: '1 h',
    badge: 'Senpai',
    text: "Le foreshadowing était là dès l'épisode 3, regardez bien la scène du pont.",
    sugoi: 42,
    reacted: true,
    replies: [{ author: members.aiko, ago: '45 min', text: 'Non, je vais tout revoir ce soir !' }],
  },
  {
    author: members.yuna,
    ago: '30 min',
    text: "Le studio a mis le paquet sur l'animation du combat final.",
    sugoi: 18,
  },
];

export const season = {
  name: "L'Automne des Yokai",
  hashtag: '#AutomneDesYokai',
  remaining: '3 j restants',
  feedChallenge: { label: 'Défi : 7 / 10 critiques publiées', progress: 70 },
  challenges: [
    {
      icon: 'popcorn' as const,
      label: 'Regarder 3 watch parties',
      done: 3,
      total: 3,
      reward: '+150 EXP',
      tone: 'gold' as const,
    },
    {
      icon: 'pencil' as const,
      label: 'Publier 10 critiques',
      done: 7,
      total: 10,
      reward: '+200 EXP · carte Kitsune rare',
      tone: 'primary' as const,
    },
    {
      icon: 'question' as const,
      label: 'Gagner 5 quiz battles',
      done: 2,
      total: 5,
      reward: '+250 EXP · titre « Esprit vif »',
      tone: 'sakura' as const,
    },
    {
      icon: 'graduation' as const,
      label: 'Parrainer un kohai',
      done: 0,
      total: 1,
      tone: 'primary' as const,
    },
  ],
  finalReward: 'Carte légendaire « Roi Tengu » + cadre animé',
};

export const trends = [
  { tag: '#LamesDuCrépuscule', meta: "2 340 publications aujourd'hui", hot: true },
  { tag: '#AutomneDesYokai', meta: 'Arc de saison · 1 120 publications' },
  { tag: '#FanArtFriday', meta: '860 publications' },
];

// Profil

export const myProfile = {
  ...me,
  city: 'Cotonou',
  bio: 'Stratège à Cotonou. Théories sur les shōnen, critiques sans spoiler.',
  exp: 1280,
  expNext: 2000,
  seen: 148,
  nakama: 320,
  power: '4 820',
  cards: 37,
  coins: 1250,
  kohai: 2,
  email: 'ren@exemple.com',
};

export const memberProfile = {
  ...members.aiko,
  bio: 'Fan art et théories sur les shōnen. Guild Sakura Ronin.',
  posts: 212,
  nakama: 540,
  power: '5 310',
  common: '3 animes en commun · Lames du crépuscule, Mecha Aurora…',
  gallery: [
    { label: 'Théorie ép. 12', tone: 2 as Tone },
    { label: 'Fan art', tone: 5 as Tone },
    { label: 'Top 5 combats', tone: 1 as Tone },
    { label: 'Cosplay', tone: 6 as Tone },
    { label: 'Mecha sketch', tone: 3 as Tone },
    { label: 'Critique', tone: 4 as Tone },
  ],
};

export const watchlist = [
  { anime: anime('lames-du-crepuscule'), episode: 8, next: 'nouvel épisode samedi' },
  { anime: anime('academie-hoshizora'), episode: 3, next: 'saison complète' },
  { anime: anime('mecha-aurora'), episode: 17, next: 'nouvel épisode mardi' },
];

export const upNext = [
  anime('le-dernier-ronin'),
  anime('esprits-de-kyoto'),
  anime('isekai-boulanger'),
];
export const popular = [
  anime('mecha-aurora'),
  anime('lames-du-crepuscule'),
  anime('cuisine-d-edo'),
];

export type Rarity = 'legendaire' | 'rare' | 'commune';
export const cards: ({ name: string; tone: Tone; rarity: Rarity } | { locked: string })[] = [
  { name: "Kaito, lame d'aube", tone: 1, rarity: 'legendaire' },
  { name: "Mei l'oracle", tone: 2, rarity: 'rare' },
  { name: 'Pilote Aurora', tone: 3, rarity: 'commune' },
  { name: 'Chef Tanuki', tone: 4, rarity: 'rare' },
  { locked: "Arc d'automne" },
  { locked: 'Quiz battle' },
];

export const frames = [
  { id: 'lune', name: 'Lune rousse', ring: 'gold' as const, price: 350 },
  { id: 'sakura', name: 'Pétales de sakura', ring: 'sakura' as const, price: 400 },
  { id: 'nuit', name: 'Nuit indigo', ring: 'primary' as const, price: 300 },
  { id: 'jade', name: 'Jade', ring: 'success' as const, price: 250 },
];

export const levelUp = {
  level: 13,
  rank: 'Stratège · rang Chūnin',
  exp: 80,
  expNext: 2200,
  rewards: [
    { icon: 'crown' as const, label: 'Titre « Théoricien »', tone: 'primary' as const },
    { icon: 'coin' as const, label: '+50 pièces', tone: 'gold' as const },
    { icon: 'palette' as const, label: 'Cadre de profil « Lune rousse »', tone: 'sakura' as const },
  ],
};

// Onboarding

export const firstNakama = [
  { member: members.aiko, why: 'Aime aussi Lames du crépuscule' },
  { member: members.kenji, why: 'Guild Sakura Ronin' },
  { member: members.yuna, why: '3 animes en commun' },
  { member: members.sora, why: 'Top critique Mecha Aurora' },
];

// Communauté

export const quiz = {
  question: 'Comment appelle-t-on un anime centré sur des robots géants pilotés ?',
  index: 4,
  total: 10,
  answers: [
    { key: 'A', label: 'Isekai' },
    { key: 'B', label: 'Mecha' },
    { key: 'C', label: 'Josei' },
    { key: 'D', label: 'Slice of life' },
  ],
  good: 'B',
  opponent: members.kenji,
};

export const affinityPeople = [
  {
    member: members.hana,
    match: '92 %',
    meta: 'Niv. 11 · Barde · Porto-Novo',
    bio: 'Toujours partante pour une watch party le samedi soir.',
    animes: ['lames-du-crepuscule', 'mecha-aurora', 'volley-kaze'],
  },
  {
    member: members.kofi,
    match: '87 %',
    meta: 'Niv. 15 · Guerrier · Lomé',
    bio: 'Champion de quiz, je cherche une guild compétitive.',
    animes: ['le-dernier-ronin', 'chroniques-du-shogun', 'mecha-aurora'],
  },
  {
    member: members.lina,
    match: '81 %',
    meta: 'Niv. 8 · Mage · Abidjan',
    bio: 'Fan art tous les vendredis, viens voir mes dessins.',
    animes: ['academie-hoshizora', 'esprits-de-kyoto', 'cuisine-d-edo'],
  },
].map((p) => ({ ...p, animes: p.animes.map(anime) }));

// Messages

export interface ConversationPreview {
  id: string;
  title: string;
  member?: Member;
  guild?: boolean;
  time: string;
  preview: string;
  unread?: number;
  call?: 'voice' | 'video';
  href: 'conversation' | 'appel-vocal' | 'appel-video';
}

export const conversations: ConversationPreview[] = [
  {
    id: 'aiko',
    title: 'Aïko',
    member: members.aiko,
    time: '21:04',
    preview: "Tu as vu la fin de l'épisode 12 ?",
    unread: 2,
    href: 'conversation',
  },
  {
    id: 'sakura-ronin',
    title: 'Sakura Ronin',
    guild: true,
    time: '20:41',
    preview: 'Sora : Je suis là à 20 h, préparez-vous.',
    href: 'conversation',
  },
  {
    id: 'kenji',
    title: 'Kenji',
    member: { ...members.kenji, online: false },
    time: 'Hier',
    preview: 'Appel vocal · 18 min',
    call: 'voice',
    href: 'appel-vocal',
  },
  {
    id: 'yuna',
    title: 'Yuna · ta kohai',
    member: { ...members.yuna, online: false },
    time: 'Lun.',
    preview: 'Merci senpai pour la reco !',
    href: 'conversation',
  },
  {
    id: 'hana',
    title: 'Hana',
    member: members.hana,
    time: 'Dim.',
    preview: 'Appel vidéo · 42 min',
    call: 'video',
    href: 'appel-video',
  },
];

export const chat = {
  with: members.aiko,
  messages: [
    { from: 'them' as const, text: "Tu as vu la fin de l'épisode 12 ?" },
    { from: 'me' as const, text: "Pas encore, j'en suis au 8. Pas de spoil !" },
    { from: 'them' as const, shared: { text: 'Ma théorie sur le mentor…', postId: 'twist-final' } },
    { from: 'them' as const, text: 'Promis. Watch party ce soir pour rattraper ?' },
  ],
  quickReplies: ['Carrément !', 'Sugoi', '21 h ça marche'],
  seen: 'Vu à 21:05',
};

export const watchPartyChat = [
  {
    member: members.kenji,
    text: "Cette musique d'ouverture, frissons",
    nameTone: 'sakura' as const,
  },
  {
    member: members.yuna,
    text: 'La scène du pont arrive dans 2 min',
    nameTone: 'primary' as const,
  },
];

export const liveChat = [
  { name: 'Aïko', tone: 1 as Tone, text: 'Les couleurs sont dingues' },
  { name: 'Kenji', tone: 2 as Tone, text: 'a offert 50 pièces' },
  { name: 'Yuna', tone: 3 as Tone, text: 'Tu fais un tuto après ?' },
];

// Modération

export const reportReasons = [
  { id: 'spoiler', label: 'Spoiler non signalé', icon: 'eye-slash' as const },
  { id: 'spam', label: 'Spam ou bot', icon: 'warning' as const },
  { id: 'harcelement', label: 'Harcèlement', icon: 'prohibit' as const },
  { id: 'choquant', label: 'Contenu choquant', icon: 'flag' as const },
  { id: 'faux', label: 'Faux compte', icon: 'user-circle' as const },
];

/** Formate un nombre à la française : 1 250, 2 340. */
export const fr = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
