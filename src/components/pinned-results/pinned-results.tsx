import { Header } from '@awsui/components-react';
import Table from '@awsui/components-react/table';
import { convertValues } from '../../helpers/convert-values';
import type { PinnedUiItem } from '../../types';
import { getItems } from './helpers/storage';

export function PinnedResults() {
  const items = getItems();
  const uiItems: Array<PinnedUiItem> = items.map((item) => {
    const convertedValues = convertValues({ time: item.time, adena: item.adena, exp: item.exp });
    return {
      timestamp: item.timestamp,
      character: item.character,
      comment: item.character,
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
