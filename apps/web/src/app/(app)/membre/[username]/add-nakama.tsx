'use client';
import { useState } from 'react';
import { Button } from '@/components/ui';

export function AddNakama() {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-2">
      <Button
        variant={added ? 'secondary' : 'primary'}
        icon={added ? 'check' : 'user-plus'}
        aria-pressed={added}
        onClick={() => setAdded(!added)}
        className="flex-1"
      >
        {added ? 'Nakama' : 'Ajouter en nakama'}
      </Button>
      <Button
        href="/conversation/aiko"
        variant="secondary"
        size="icon"
        icon="chat-circle-dots"
        aria-label="Envoyer un message"
      />
    </div>
  );
}
