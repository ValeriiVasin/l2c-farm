import { Header } from '@awsui/components-react';
import Table from '@awsui/components-react/table';
import { convertValues } from '../../helpers/convert-values';
import type { PinnedResult, PinnedUiItem } from '../../types';

export function PinnedResults({ results }: { results: Array<PinnedResult> }) {
  const uiItems: Array<PinnedUiItem> = results.map((result) => {
    const convertedValues = convertValues({ time: result.time, adena: result.adena, exp: result.exp });
    return {
      timestamp: result.timestamp,
      character: result.character,
      comment: result.character,
      dailyAdena: convertedValues.dailyAdena,
      dailyExp: convertedValues.dailyExp,
    };
  });

  if (uiItems.length === 0) {
    return null;
  }

  return (
    <Table
      header={<Header variant="h3">Закрепленные Результаты</Header>}
      trackBy="timestamp"
      items={uiItems}
      columnDefinitions={[
        { header: 'Дата', cell: (item) => item.timestamp },
        { header: 'Персонаж', cell: (item) => item.character },
        { header: 'Опыт (24ч)', cell: (item) => item.dailyExp },
        { header: 'Адена (24ч)', cell: (item) => item.dailyAdena },
        { header: 'Комментарий', cell: (item) => item.comment },
      ]}
    ></Table>
  );
}
