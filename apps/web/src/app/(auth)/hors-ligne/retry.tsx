'use client';
import { Button } from '@/components/ui';

export function RetryButton() {
  return (
    <Button block icon="repeat" onClick={() => location.reload()}>
      Réessayer
    </Button>
  );
}
