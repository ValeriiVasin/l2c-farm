import Button from '@awsui/components-react/button';
import Header from '@awsui/components-react/header';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import Table from '@awsui/components-react/table';
import { format } from 'date-fns';
import { useState } from 'react';
import { defaultCharacterName } from '../../constants/default-character-name';
import { defaultComment } from '../../constants/default-comment';
import { convertValues } from '../../helpers/convert-values';
import type { PinnedResult, PinnedUiItem } from '../../types';

interface PinnedResultsProps {
  results: Array<PinnedResult>;
  onClearButtonClick: () => void;
  onItemRemoveButtonClick: (timestamp: number) => void;
  changeName: (timestamp: number, name: string) => void;
}

export function PinnedResults({
  results,
  onClearButtonClick,
  onItemRemoveButtonClick,
  changeName,
}: PinnedResultsProps) {
  const uiItems: Array<PinnedUiItem> = results.map((result) => {
    const convertedValues = convertValues({ time: result.time, adena: result.adena, exp: result.exp });
    return {
      timestamp: result.timestamp,
      character: result.character,
      comment: result.comment,
      dailyAdena: convertedValues.dailyAdena,
      dailyExp: convertedValues.dailyExp,
    };
  });

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
            <Button data-testid="clear-pinned-results-button" variant="normal" onClick={onClearButtonClick}>
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
        { header: 'Дата', cell: (item) => format(item.timestamp, 'dd.MM.yyyy HH:mm') },
        {
          header: 'Персонаж',
          cell: (item) => <CharacterName timestamp={item.timestamp} character={item.character} onChange={changeName} />,
        },
        { header: 'Опыт (24ч)', cell: (item) => item.dailyExp },
        { header: 'Адена (24ч)', cell: (item) => item.dailyAdena },
        { header: 'Комментарий', cell: (item) => item.comment ?? defaultComment },
        {
          header: 'Действия',
          cell: (item) => (
            <SpaceBetween size="s" direction="horizontal">
              <span title="Редактировать">
                <Button variant="inline-icon" iconName="edit" />
              </span>
              <span title="Удалить" onClick={() => onItemRemoveButtonClick(item.timestamp)}>
                <Button data-testid={`remove-item-${item.timestamp}`} variant="inline-icon" iconName="close" />
              </span>
            </SpaceBetween>
          ),
        },
      ]}
    ></Table>
  );
}

interface CharacterNameProps {
  timestamp: number;
  character?: string;
  onChange: (timestamp: number, name: string) => void;
}
function CharacterName({ timestamp, character, onChange }: CharacterNameProps) {
  const [name, setName] = useState(character ?? '');
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <SpaceBetween size="s" direction="horizontal">
        <Input
          autoFocus
          data-testid={`edit-character-input-${timestamp}`}
          value={name}
          onChange={(event) => setName(event.detail.value)}
          onKeyDown={(event) => {
            if (event.detail.key === 'Enter') {
              onChange(timestamp, name);
              setIsEdit(false);
              return;
            }

            if (event.detail.key === 'Escape') {
              setName(character ?? '');
              setIsEdit(false);
              return;
            }
          }}
        />
      </SpaceBetween>
    );
  }

  return (
    <SpaceBetween size="xxxs" direction="horizontal">
      <span data-testid={`character-name-${timestamp}`}>{character ?? defaultCharacterName}</span>
      <Button
        onClick={() => setIsEdit(true)}
        data-testid={`edit-character-button-${timestamp}`}
        iconName="edit"
        variant="inline-icon"
      ></Button>
    </SpaceBetween>
  );
}
