import AppLayout from '@awsui/components-react/app-layout';
import Button from '@awsui/components-react/button';
import Cards from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Container from '@awsui/components-react/container';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import { useEffect, useRef, useState } from 'react';
import { pinItem } from './components/pinned-results/helpers/storage';
import { PinnedResults } from './components/pinned-results/pinned-results';
import { formatNumber } from './helpers/format-number';
import { parseNumber } from './helpers/parse-number';
import { parseTime } from './helpers/parse-time';
import { useAppSearchParams } from './hooks/use-app-search-params/use-app-search-params';

export function App() {
  return <AppLayout content={<Content />} navigationHide toolsHide></AppLayout>;
}

interface CardItem {
  id: 'hourly' | 'daily';
  header: string;
  exp: string;
  adena: string;
}

const searchParamsConfig = {
  exp: '',
  adena: '',
  time: '',
};

function Content() {
  const { searchParams, setSearchParams } = useAppSearchParams(searchParamsConfig);

  const [exp, setExp] = useState(searchParams.exp);
  const [adena, setAdena] = useState(searchParams.adena);
  const [time, setTime] = useState(searchParams.time);

  const expInputRef = useRef<HTMLInputElement>(null);

  const parsedTime = parseTime(time);
  const isTimeCorrect = Number.isFinite(parsedTime) && parsedTime > 0;
  const perMinute = (value: number) => (isTimeCorrect ? value / parsedTime : 0);
  const perHour = (value: number) => perMinute(value) * 60;
  const perDay = (value: number) => perHour(value) * 24;

  const parsedExp = parseNumber(exp);
  const isExpCorrect = Number.isFinite(parsedExp);

  const parsedAdena = parseNumber(adena);
  const isAdenaCorrect = Number.isFinite(parsedAdena);
  const showResults = isTimeCorrect && (isAdenaCorrect || isExpCorrect);

  const cardItems: Array<CardItem> = [
    {
      header: 'За 1 час',
      id: 'hourly',
      adena: isAdenaCorrect ? formatNumber(perHour(parsedAdena)) : '-',
      exp: isExpCorrect ? formatNumber(perHour(parsedExp)) : '-',
    },
    {
      header: 'За 24 часа',
      id: 'daily',
      adena: isAdenaCorrect ? formatNumber(perDay(parsedAdena)) : '-',
      exp: isExpCorrect ? formatNumber(perDay(parsedExp)) : '-',
    },
  ];

  const onClearButtonClick = () => {
    setTime('');
    setAdena('');
    setExp('');
    expInputRef.current?.focus();
  };

  const onPinButtonClick = () => {
    pinItem({ adena, exp, time, character: 'не указан', comment: '', timestamp: Date.now() });
  };

  useEffect(() => {
    setSearchParams({ exp, time, adena });
  }, [exp, adena, time, setSearchParams]);

  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Header
            variant="h3"
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button data-testid="pin-button" variant="primary" disabled={!showResults} onClick={onPinButtonClick}>
                  Закрепить
                </Button>
                <Button data-testid="clear-button" variant="normal" onClick={onClearButtonClick}>
                  Очистить
                </Button>
              </SpaceBetween>
            }
          >
            Калькулятор Фарма
          </Header>
        }
      >
        <ColumnLayout columns={2} variant="text-grid">
          <SpaceBetween direction="vertical" size="s">
            <FormField label="Опыт" constraintText="Например, 250kk">
              <Input data-testid="exp" ref={expInputRef} value={exp} onChange={(event) => setExp(event.detail.value)} />
            </FormField>

            <FormField label="Адена" constraintText="Например, 15kk">
              <Input data-testid="adena" value={adena} onChange={(event) => setAdena(event.detail.value)} />
            </FormField>

            <FormField label="Затраченное время" constraintText="Например, 1ч 20м или 1h 20m">
              <Input data-testid="time" value={time} onChange={(event) => setTime(event.detail.value)} />
            </FormField>
          </SpaceBetween>
          {showResults && (
            <Cards
              data-testid="results"
              trackBy={'header'}
              items={cardItems}
              cardDefinition={{
                header: (item) => <Header variant="h3">{item.header}</Header>,
                sections: [
                  {
                    header: 'Опыт',
                    content: (item) => <span data-testid={sectionTestId(item, 'exp')}>{item.exp}</span>,
                  },
                  {
                    header: 'Адена',
                    content: (item) => <span data-testid={sectionTestId(item, 'adena')}>{item.adena}</span>,
                  },
                ],
              }}
              cardsPerRow={[{ cards: 2 }]}
            ></Cards>
          )}
        </ColumnLayout>
      </Container>
      <PinnedResults />
    </SpaceBetween>
  );
}

function sectionTestId(item: CardItem, variant: 'adena' | 'exp') {
  return `section-${variant}-${item.id}`;
}
