'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { KeyStatistics } from './key-statistics';

export function StatisticsWithFilter() {
  const [period, setPeriod] = useState<'current' | 'last' | '12m'>('current');

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu portfólio imobiliário</p>
        </div>
        <ToggleGroup
          type="single"
          value={period}
          onValueChange={(v) => v && setPeriod(v as any)}
          className="self-start md:self-auto"
        >
          <ToggleGroupItem value="current" aria-label="Mês atual">
            Mês atual
          </ToggleGroupItem>
          <ToggleGroupItem value="last" aria-label="Último mês">
            Último mês
          </ToggleGroupItem>
          <ToggleGroupItem value="12m" aria-label="12 meses">
            12 meses
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <KeyStatistics period={period} />
    </>
  );
}
