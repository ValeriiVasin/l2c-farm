import Button from '@awsui/components-react/button';
import Header from '@awsui/components-react/header';
import Link from '@awsui/components-react/link';
import SpaceBetween from '@awsui/components-react/space-between';
import Table from '@awsui/components-react/table';
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { defaultCharacterName } from '../../constants/default-character-name';
import { defaultComment } from '../../constants/default-comment';
import { searchParamsConfig } from '../../constants/search-params-config';
import { useAppSearchParams } from '../../hooks/use-app-search-params/use-app-search-params';
import { usePinnedResults } from '../../hooks/use-pinned-results/use-pinned-results';
import { uiPinnedResultsSelector } from '../../state';
import { EditableField } from '../editable-field/editable-field';

export function PinnedResults() {
  const { changePinnedCharacterName, changePinnedComment, clearPinnedResults, removePinnedResult } = usePinnedResults();
  const { url } = useAppSearchParams(searchParamsConfig);

  const uiItems = useRecoilValue(uiPinnedResultsSelector);

  if (uiItems.length === 0) {
    return null;
  }

  return (
    <Table
      data-testid="pinned-results-table"
      header={
        <Header
          variant="h3"
          actions={
            <Button data-testid="clear-pinned-results-button" variant="normal" onClick={clearPinnedResults}>
              Очистить
            </Button>
          }
        >
          Закрепленные Результаты
        </Header>
      }
      trackBy="timestamp"
      items={uiItems}
      columnDefinitions={[
        {
          header: 'Дата',
          width: 200,
          cell: ({ time, adena, exp, timestamp }) => (
            <Link data-testid={`results-link-${timestamp}`} href={url('/', { time, adena, exp })}>
              {format(timestamp, 'dd.MM.yyyy HH:mm')}
            </Link>
          ),
        },
        {
          header: 'Персонаж',
          width: 200,
          cell: ({ timestamp, character }) => (
            <EditableField
              field="character"
              timestamp={timestamp}
              value={character}
              defaultDisplayValue={defaultCharacterName}
              onChange={changePinnedCharacterName}
            />
          ),
        },
        { header: 'Опыт (24ч)', width: 100, cell: ({ dailyExp }) => dailyExp },
        { header: 'Адена (24ч)', width: 100, cell: ({ dailyAdena }) => dailyAdena },
        {
          header: 'Комментарий',
          cell: ({ timestamp, comment }) => (
            <EditableField
              field="comment"
              timestamp={timestamp}
              value={comment}
              defaultDisplayValue={defaultComment}
              onChange={changePinnedComment}
            />
          ),
        },
        {
          header: 'Действия',
          width: 50,
          cell: ({ timestamp }) => (
            <SpaceBetween size="s" direction="horizontal">
              <span title="Удалить">
                <Button
                  data-testid={`remove-item-${timestamp}`}
                  variant="inline-icon"
                  iconName="close"
                  onClick={() => removePinnedResult(timestamp)}
                />
              </span>
            </SpaceBetween>
          ),
        },
      ]}
    ></Table>
  );
}
