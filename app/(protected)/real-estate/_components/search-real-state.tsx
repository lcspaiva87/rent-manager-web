import { forwardRef, memo } from 'react';
import { Input } from '@/components/ui/input';

const SearchRealStateComponent = memo(
  forwardRef<
    HTMLTextAreaElement,
    {
      onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
      disabled: boolean;
    }
  >(({ onKeyDown, disabled }, ref) => {
    return (
      <Input
        aria-label="Pesquisar por morada, cidade..."
        className="p-3 w-1/2"
        placeholder="Procurar por morada, cidade..."
        data-testid="real-estate-search"
        ref={ref as React.Ref<HTMLInputElement>}
        onKeyDown={onKeyDown as unknown as React.KeyboardEventHandler<HTMLInputElement>}
        disabled={disabled}
      />
    );
  })
);

export const SearchRealState = memo(SearchRealStateComponent);
