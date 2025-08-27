import { Plus } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/button';

function CreateRealStateComponent() {
  return (
    <Button data-testid="create-real-state" aria-label="Criar imóvel">
      <Plus className="size-4" />
      Criar
    </Button>
  );
}

export const CreateRealState = memo(CreateRealStateComponent);
