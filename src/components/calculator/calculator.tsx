import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Cards from '@awsui/components-react/cards';
import ColumnLayout from '@awsui/components-react/column-layout';
import Container from '@awsui/components-react/container';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import { useEffect, useMemo, useRef, useState } from 'react';
import { searchParamsConfig } from '../../constants/search-params-config';
import { convertValues } from '../../helpers/convert-values';
import { useAppSearchParams } from '../../hooks/use-app-search-params/use-app-search-params';
import { usePinnedResults } from '../../hooks/use-pinned-results/use-pinned-results';

interface CardItem {
  id: 'hourly' | 'daily';
  header: string;
  exp: string;
  adena: string;
}

export function Calculator() {
  const { searchParams, setSearchParams } = useAppSearchParams(searchParamsConfig);
  const { pinResult } = usePinnedResults();

  const [exp, setExp] = useState(searchParams.exp);
  const [adena, setAdena] = useState(searchParams.adena);
  const [time, setTime] = useState(searchParams.time);

  const expInputRef = useRef<HTMLInputElement>(null);

  const convertedValues = useMemo(() => convertValues({ time, exp, adena }), [time, exp, adena]);
  const cardItems: CardItem[] = useMemo(
    () => [
      {
        header: 'За 1 час',
        id: 'hourly',
        adena: convertedValues.hourlyAdena,
        exp: convertedValues.hourlyExp,
      },
      {
        header: 'За 24 часа',
        id: 'daily',
        adena: convertedValues.dailyAdena,
        exp: convertedValues.dailyExp,
      },
    ],
    [convertedValues],
  );
  const showResults = useMemo(
    () => convertedValues.isTimeCorrect && (convertedValues.isAdenaCorrect || convertedValues.isExpCorrect),
    [convertedValues],
  );

  const onClearButtonClick = () => {
    setTime('');
    setAdena('');
    setExp('');
    expInputRef.current?.focus();
  };

  const onPinButtonClick = () => pinResult({ adena, exp, time, timestamp: Date.now() });

  useEffect(() => {
    setSearchParams({ exp, time, adena });
  }, [exp, adena, time, setSearchParams]);

  return (
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
                  content: (item) => <Box data-testid={`section-exp-${item.id}`}>{item.exp}</Box>,
                },
                {
                  header: 'Адена',
                  content: (item) => <Box data-testid={`section-adena-${item.id}`}>{item.adena}</Box>,
                },
              ],
            }}
            cardsPerRow={[{ cards: 2 }]}
          ></Cards>
        )}
      </ColumnLayout>
    </Container>
  );
}
