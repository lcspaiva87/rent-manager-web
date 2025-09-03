import { Label } from '@/components/ui/label';
import type { NotesSectionProps } from './types/real-estate-types';

export function NotesSection({ form }: NotesSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900 border-b pb-1">📝 Notas Internas</h3>

      <div>
        <Label htmlFor="internalNotes">Observações</Label>
        <textarea
          id="internalNotes"
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Chaves com o porteiro. Necessita inspeção do gás."
          {...form.register('internalNotes')}
        />
        {form.formState.errors.internalNotes && (
          <p className="text-xs text-destructive mt-1">
            {form.formState.errors.internalNotes.message}
          </p>
        )}

        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Campo opcional para anotações internas</p>
          <p className="text-xs text-gray-400">
            {form.watch('internalNotes')?.length || 0} caracteres
          </p>
        </div>
      </div>
    </div>
  );
}
