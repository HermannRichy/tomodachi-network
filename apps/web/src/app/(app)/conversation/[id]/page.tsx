import type { Metadata } from 'next';
import { conversations } from '@tomodachi/fixtures';
import { Chat } from './chat';

export const metadata: Metadata = { title: 'Conversation' };
export const instant = false;

export function generateStaticParams() {
  return conversations.filter((c) => c.href === 'conversation').map((c) => ({ id: c.id }));
}

// Les maquettes détaillent la conversation avec Aïko : les autres reprennent ce fil.
export default async function Conversation({ params }: PageProps<'/conversation/[id]'>) {
  const { id } = await params;
  return <Chat key={id} />;
}
