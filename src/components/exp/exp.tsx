import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import ColumnLayout from '@awsui/components-react/column-layout';
import Container from '@awsui/components-react/container';
import Form from '@awsui/components-react/form';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { maxLevel } from '../../constants/max-level';
import { formatNumber } from '../../helpers/format-number';
import { getExp } from '../../helpers/get-exp';
import { parseNumber } from '../../helpers/parse-number';
import { parseTime } from '../../helpers/parse-time';
import { timeToString } from '../../helpers/time-to-string';

const fiveYearsInMinutes = 5 * 60 * 24 * 365;
const durationToString = (minutes: bigint): string => {
  return minutes > fiveYearsInMinutes ? 'более 5 лет' : timeToString(Number(minutes));
};

export function Exp() {
  const [levelFromText, setLevelFromText] = useState('');
  const [levelToText, setLevelToText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [expText, setExpText] = useState('');

  const levelFromInputRef = useRef<HTMLInputElement>(null);

  const parsedLevelFrom = Number(levelFromText);
  const isLevelFromValid =
    levelFromText.length > 0 && z.number().gte(0).lt(maxLevel).safeParse(parsedLevelFrom).success;

  const parsedLevelTo = Number(levelToText);
  const isLevelToValid = z.number().gt(parsedLevelFrom).lte(maxLevel).safeParse(parsedLevelTo).success;

  const isExpValid = isLevelFromValid && isLevelToValid;
  const exp = isExpValid ? getExp({ from: parsedLevelFrom, to: parsedLevelTo }) : BigInt(0);
  const formattedExp = formatNumber(exp);

  const parsedExp = parseNumber(expText);
  const isParsedExpValid = z.number().positive().safeParse(parsedExp).success;

  const parsedTime = parseTime(timeText);
  const isParsedTimeValid = z.number().positive().safeParse(parsedTime).success;

  const isExpSpeedValid = isParsedExpValid && isParsedTimeValid;
  const formattedDuration = isExpSpeedValid
    ? durationToString(exp / BigInt(Math.max(1, Math.round(parsedExp / parsedTime))))
    : '';

  const onClearButtonClick = () => {
    // TBD
  };

  return (
    <Container
      data-testid="exping"
      header={
        <Header
          variant="h3"
          actions={
            <Button data-testid="clear-button" onClick={onClearButtonClick}>
              Очистить
            </Button>
          }
        >
          Калькулятор Опыта
        </Header>
      }
    >
      <ColumnLayout columns={2} variant="text-grid">
        <SpaceBetween direction="vertical" size="l">
          <Form
            header={
              <Header variant="h3" actions={<Button>Очистить</Button>}>
                Уровень
              </Header>
            }
          >
            <ColumnLayout columns={2}>
              <FormField label="Текущий уровень" constraintText="от 0 до 100. Например, 91.2493">
                <Input
                  data-testid="level-from-input"
                  type="number"
                  inputMode="decimal"
                  step={1}
                  ref={levelFromInputRef}
                  value={levelFromText}
                  onChange={(event) => setLevelFromText(event.detail.value)}
                />
              </FormField>

              <FormField label="Желаемый уровень" constraintText="от 1 до 100">
                <Input
                  data-testid="level-to-input"
                  type="number"
                  inputMode="decimal"
                  step={1}
                  value={levelToText}
                  onChange={(event) => setLevelToText(event.detail.value)}
                />
              </FormField>
            </ColumnLayout>
          </Form>

          <Form
            header={
              <Header variant="h3" actions={<Button>Очистить</Button>}>
                Скорость прокачки
              </Header>
            }
          >
            <ColumnLayout columns={2}>
              <FormField label="Полученный опыт" constraintText="Например, 100ккк">
                <Input
                  data-testid="exp-speed-input"
                  value={expText}
                  onChange={(event) => setExpText(event.detail.value)}
                />
              </FormField>

              <FormField label="Затраченное время" constraintText="Например, 1ч 20м">
                <Input
                  data-testid="exp-time-input"
                  value={timeText}
                  onChange={(event) => setTimeText(event.detail.value)}
                />
              </FormField>
            </ColumnLayout>
          </Form>
        </SpaceBetween>
        <SpaceBetween size="l">
          {isExpValid && (
            <Box>
              <Box variant="awsui-key-label">Необходимое количество опыта</Box>
              <Box variant="awsui-value-large" data-testid="exp-level-result">
                {formattedExp}
              </Box>
            </Box>
          )}
          {isExpValid && isExpSpeedValid && (
            <Box>
              <Box variant="awsui-key-label">Время достижения</Box>
              <Box variant="awsui-value-large" data-testid="exp-speed-result">
                {formattedDuration}
              </Box>
            </Box>
          )}
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
}
