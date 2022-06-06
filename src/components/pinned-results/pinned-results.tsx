import { Header } from '@awsui/components-react';
import Table from '@awsui/components-react/table';
import type { PinnedUiItem } from '../../types';

export function PinnedResults() {
  const items: Array<PinnedUiItem> = [];
  return (
    <Table
      header={<Header variant="h3">Закрепленные Результаты</Header>}
      trackBy="timestamp"
      items={items}
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
