import AppLayout from '@awsui/components-react/app-layout';
import Button from '@awsui/components-react/button';
import ColumnLayout from '@awsui/components-react/column-layout';
import Container from '@awsui/components-react/container';
import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import Table from '@awsui/components-react/table';
import { useState } from 'react';

export function App() {
  return <AppLayout
    content={<Content />}
    navigationHide
    toolsHide
    ></AppLayout>
}

function Content() {
  const [exp, setExp] = useState('250kk');
  const [time, setTime] = useState('1ч 20мин');
  const [adena, setAdena] = useState('15кк');
  const items = [
    { title: 'Опыт', hourly: '5kkk', daily: '120kkk' },
    { title: 'Адена', hourly: '500k', daily: '12kk' },
  ];

  return <Container
    header={<Header variant='h3'
      actions={
        <SpaceBetween size="s" direction='horizontal'>
          <Button variant='normal'>Очистить</Button>
        </SpaceBetween>
      }>Калькулятор Фарма</Header>}
    >
    <ColumnLayout columns={2} variant="text-grid">
    <SpaceBetween direction='vertical' size='s'>
    <FormField
        label="Затраченное время"
        constraintText="Например, 1ч 20м"
        >
        <Input value={time} onChange={(event) => setTime(event.detail.value)} />
      </FormField>

      <FormField
        label="Опыт"
        constraintText="Например, 250kk"
        >
        <Input value={exp} onChange={(event) => setExp(event.detail.value)} />
        </FormField>

        <FormField
        label="Адена"
        constraintText="Например, 15kk"
        >
        <Input value={adena} onChange={(event) => setAdena(event.detail.value)} />
        </FormField>

      </SpaceBetween>

      <Table
        items={items}
        columnDefinitions={[
          { header: '', cell: item => item.title },
          { header: 'За 1 час', cell: item => item.hourly },
          { header: 'За 24 часа', cell: item => item.daily }
        ]}
        ></Table>
    </ColumnLayout>
  </Container>
}
