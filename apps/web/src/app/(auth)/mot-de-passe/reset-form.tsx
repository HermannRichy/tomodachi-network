'use client';
import { useState } from 'react';
import { Icon } from '@/components/icon';
import { Button, Card } from '@/components/ui';

export function ResetForm() {
  const [sent, setSent] = useState(false);
  if (!sent) {
    return (
      <Button block onClick={() => setSent(true)}>
        Envoyer le lien
      </Button>
    );
  }
  return (
    <>
      <div role="status">
        <Card variant="gold">
          <div className="flex items-center gap-2.5">
            <Icon name="check-circle" className="text-success" />
            <span className="text-title-3">Lien envoyé</span>
          </div>
          <p className="text-body-sm">Regarde ta boîte mail. Le lien reste valable 30 minutes.</p>
        </Card>
      </div>
      <Button href="/connexion" variant="secondary" block>
        Retour à la connexion
      </Button>
    </>
  );
}
