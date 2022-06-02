import AppLayout from '@awsui/components-react/app-layout';
import Button from '@awsui/components-react/button';
import Cards from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Container from '@awsui/components-react/container';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import { useCallback, useState } from 'react';
import { formatNumber } from './helpers/format-number';
import { parseNumber } from './helpers/parse-number';
import { parseTime } from './helpers/parse-time';

export function App() {
  return <AppLayout content={<Content />} navigationHide toolsHide></AppLayout>;
}

interface CardItem {
  header: string;
  exp: string;
  adena: string;
}

function Content() {
  const [exp, setExp] = useState('250kk');
  const [time, setTime] = useState('1ч 20м');
  const [adena, setAdena] = useState('15кк');

  const parsedTime = parseTime(time);
  const isTimeCorrect = Number.isFinite(parsedTime) && parsedTime > 0;
  const perMinute = useCallback(
    (value: number) => (isTimeCorrect ? value / parsedTime : 0),
    [parsedTime, isTimeCorrect],
  );
  const perHour = useCallback((value: number) => perMinute(value) * 60, [perMinute]);
  const perDay = useCallback((value: number) => perHour(value) * 24, [perHour]);

  const parsedExp = parseNumber(exp);
  const isExpCorrect = Number.isFinite(parsedExp);

  const parsedAdena = parseNumber(adena);
  const isAdenaCorrect = Number.isFinite(parsedAdena);
  const showResults = isTimeCorrect && (isAdenaCorrect || isExpCorrect);

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <Button variant="normal">Очистить</Button>
            </SpaceBetween>
          }
        >
          Калькулятор Фарма
        </Header>
      }
    >
      <ColumnLayout columns={2} variant="text-grid">
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Затраченное время" constraintText="Например, 1ч 20м">
            <Input value={time} onChange={(event) => setTime(event.detail.value)} />
          </FormField>

          <FormField label="Опыт" constraintText="Например, 250kk">
            <Input value={exp} onChange={(event) => setExp(event.detail.value)} />
          </FormField>

          <FormField label="Адена" constraintText="Например, 15kk">
            <Input value={adena} onChange={(event) => setAdena(event.detail.value)} />
          </FormField>
        </SpaceBetween>
        {showResults && (
          <Cards
            trackBy={'header'}
            items={[
              {
                header: 'За 1 час',
                adena: isAdenaCorrect ? formatNumber(perHour(parsedAdena)) : '-',
                exp: isExpCorrect ? formatNumber(perDay(parsedAdena)) : '-',
              },
              {
                header: 'За 24 часа',
                adena: isAdenaCorrect ? formatNumber(perHour(parsedExp)) : '-',
                exp: isExpCorrect ? formatNumber(perDay(parsedExp)) : '-',
              },
            ]}
            cardDefinition={{
              header: (item) => item.header,
              sections: [
                { header: 'Опыт', content: (item) => item.exp },
                { header: 'Адена', content: (item) => item.adena },
              ],
            }}
            cardsPerRow={[{ cards: 2 }]}
          ></Cards>
        )}
      </ColumnLayout>
    </Container>
  );
}
