import Button from '@awsui/components-react/button';
import SpaceBetween from '@awsui/components-react/space-between';
import { useState } from 'react';
import { EditFieldInline } from '../edit-field-inline/edit-field-inline';

interface EditableFieldProps {
  field: 'character' | 'comment';
  timestamp: number;
  value?: string;
  defaultDisplayValue: string;
  onChange: (timestamp: number, value: string) => void;
}

export function EditableField({ field, timestamp, value, defaultDisplayValue, onChange }: EditableFieldProps) {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <EditFieldInline
        initialValue={value}
        testId={`edit-${field}-input-${timestamp}`}
        onChange={(updatedValue) => {
          onChange(timestamp, updatedValue);
          setIsEdit(false);
        }}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <SpaceBetween size="xxxs" direction="horizontal">
      <span data-testid={`${field}-${timestamp}`}>{value ?? defaultDisplayValue}</span>
      <Button
        onClick={() => setIsEdit(true)}
        data-testid={`edit-${field}-button-${timestamp}`}
        iconName="edit"
        variant="inline-icon"
      ></Button>
    </SpaceBetween>
  );
}
