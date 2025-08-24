import { Upload } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/button';

function UploadRealEstateComponent() {
  return (
    <Button data-testid="upload-real-estate" aria-label="Importar imóveis">
      <Upload className="size-4" />
      Importar
    </Button>
  );
}

export const UploadRealEstate = memo(UploadRealEstateComponent);
