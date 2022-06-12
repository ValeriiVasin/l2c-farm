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

export function Exp() {
  const [levelFromText, setLevelFromText] = useState('');
  const [levelToText, setLevelToText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [expText, setExpText] = useState('');

  const levelFromInputRef = useRef<HTMLInputElement>(null);

  const onClearButtonClick = () => {
    // TBD
  };

  return (
    <Container
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
              <FormField label="Текущий уровень" constraintText="от 1 до 100. Например, 91.2493">
                <Input
                  type="number"
                  inputMode="decimal"
                  step={1}
                  data-testid="level-from"
                  ref={levelFromInputRef}
                  value={levelFromText}
                  onChange={(event) => setLevelFromText(event.detail.value)}
                />
              </FormField>

              <FormField label="Желаемый уровень" constraintText="от 1 до 100">
                <Input
                  data-testid="level-to"
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
                <Input data-testid="exp" value={expText} onChange={(event) => setExpText(event.detail.value)} />
              </FormField>

              <FormField label="Затраченное время" constraintText="Например, 1ч 20м">
                <Input data-testid="time" value={timeText} onChange={(event) => setTimeText(event.detail.value)} />
              </FormField>
            </ColumnLayout>
          </Form>
        </SpaceBetween>
        <SpaceBetween size="l">
          <Box>
            <Box variant="awsui-key-label">Необходимое количество опыта</Box>
            <Box variant="awsui-value-large">150kk</Box>
          </Box>
          <Box>
            <Box variant="awsui-key-label">Время достижения</Box>
            <Box variant="awsui-value-large">180 дней</Box>
          </Box>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
}
