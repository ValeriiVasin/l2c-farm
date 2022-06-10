import Input from '@awsui/components-react/input';
import SpaceBetween from '@awsui/components-react/space-between';
import { useState } from 'react';

interface EditFieldInlineProps {
  initialValue?: string;
  testId: string;
  onChange: (value: string) => void;
  onCancel: () => void;
}

export function EditFieldInline({ initialValue = '', testId, onChange, onCancel }: EditFieldInlineProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <SpaceBetween size="s" direction="horizontal">
      <Input
        autoFocus
        data-testid={testId}
        value={value}
        onChange={(event) => setValue(event.detail.value)}
        onKeyDown={(event) => {
          if (event.detail.key === 'Enter') {
            onChange(value);
            return;
          }

          if (event.detail.key === 'Escape') {
            onCancel();
            return;
          }
        }}
      />
    </SpaceBetween>
  );
}
