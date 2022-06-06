import { Header } from '@awsui/components-react';
import Table from '@awsui/components-react/table';

interface PinnedItem {
  timestamp: number;
  character: string;
  dailyExp: string;
  dailyAdena: string;
  comment: string;
}

export function PinnedResults() {
  const items: Array<PinnedItem> = [];
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
