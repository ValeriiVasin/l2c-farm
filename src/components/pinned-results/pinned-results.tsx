import Button from '@awsui/components-react/button';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import Table from '@awsui/components-react/table';
import { format } from 'date-fns';
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

  const remove = (item: PinnedUiItem) => {
    // TBD
  };

  return (
    <Table
      data-testid="pinned-results"
      header={
        <Header variant="h3" actions={<Button variant="normal">Очистить</Button>}>
          Закрепленные Результаты
        </Header>
      }
      trackBy="timestamp"
      items={uiItems}
      columnDefinitions={[
        { header: 'Дата', cell: (item) => format(item.timestamp, 'dd.MM.yyyy HH:mm') },
        { header: 'Персонаж', cell: (item) => item.character },
        { header: 'Опыт (24ч)', cell: (item) => item.dailyExp },
        { header: 'Адена (24ч)', cell: (item) => item.dailyAdena },
        { header: 'Комментарий', cell: (item) => item.comment },
        {
          header: 'Действия',
          cell: (item) => (
            <SpaceBetween size="s" direction="horizontal">
              <span title="Редактировать">
                <Button variant="inline-icon" iconName="edit" />
              </span>
              <span title="Удалить" onClick={() => remove(item)}>
                <Button variant="inline-icon" iconName="close" />
              </span>
            </SpaceBetween>
          ),
        },
      ]}
    ></Table>
  );
}
