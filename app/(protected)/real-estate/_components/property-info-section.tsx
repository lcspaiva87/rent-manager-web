import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RealEstateFormData } from './schemas/real-estate-schema';
import type { PropertyInfoSectionProps } from './types/real-estate-types';

export function PropertyInfoSection({ form }: PropertyInfoSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900 border-b pb-1">📍 Dados do Imóvel</h3>

      {/* Endereço */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="md:col-span-2">
          <Label htmlFor="address">Morada *</Label>
          <Input id="address" placeholder="Rua Exemplo 123, Lisboa" {...form.register('address')} />
          {form.formState.errors.address && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city">Cidade *</Label>
          <Input id="city" placeholder="Lisboa" {...form.register('city')} />
          {form.formState.errors.city && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.city.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="postalCode">Código Postal *</Label>
          <Input id="postalCode" placeholder="1000-001" {...form.register('postalCode')} />
          {form.formState.errors.postalCode && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      {/* Características do Imóvel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="propertyType">Tipo *</Label>
          <Select
            value={form.watch('propertyType')}
            onValueChange={(value) =>
              form.setValue('propertyType', value as RealEstateFormData['propertyType'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">🏢 Apartamento</SelectItem>
              <SelectItem value="casa">🏠 Casa</SelectItem>
              <SelectItem value="comercial">🏪 Comercial</SelectItem>
              <SelectItem value="terreno">🌾 Terreno</SelectItem>
              <SelectItem value="garagem">🚗 Garagem</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.propertyType && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.propertyType.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="typology">Tipologia *</Label>
          <Select
            value={form.watch('typology')}
            onValueChange={(value) =>
              form.setValue('typology', value as RealEstateFormData['typology'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Ex: T2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="T0">T0</SelectItem>
              <SelectItem value="T1">T1</SelectItem>
              <SelectItem value="T2">T2</SelectItem>
              <SelectItem value="T3">T3</SelectItem>
              <SelectItem value="T4">T4</SelectItem>
              <SelectItem value="T5">T5</SelectItem>
              <SelectItem value="T6+">T6+</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.typology && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.typology.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="area">Área (m²) *</Label>
          <Input id="area" type="number" min="1" placeholder="85" {...form.register('area')} />
          {form.formState.errors.area && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.area.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="constructionYear">Ano de Construção *</Label>
          <Input
            id="constructionYear"
            type="number"
            min="1800"
            max={new Date().getFullYear()}
            placeholder="2018"
            {...form.register('constructionYear')}
          />
          {form.formState.errors.constructionYear && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.constructionYear.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="propertyCondition">Estado *</Label>
          <Select
            value={form.watch('propertyCondition')}
            onValueChange={(value) =>
              form.setValue('propertyCondition', value as RealEstateFormData['propertyCondition'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="novo">✨ Novo</SelectItem>
              <SelectItem value="pronto_habitar">✅ Pronto a habitar</SelectItem>
              <SelectItem value="renovacao_ligeira">🔧 Renovação ligeira</SelectItem>
              <SelectItem value="grandes_obras">🚧 Grandes obras</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.propertyCondition && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.propertyCondition.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="fiscalNumber">Número Fiscal *</Label>
          <Input id="fiscalNumber" placeholder="123456789" {...form.register('fiscalNumber')} />
          {form.formState.errors.fiscalNumber && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.fiscalNumber.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
