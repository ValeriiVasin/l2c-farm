import SpaceBetween from '@awsui/components-react/space-between';
import { Calculator } from '../calculator/calculator';
import { PinnedResults } from '../pinned-results/pinned-results';

export function Farm() {
  return (
    <SpaceBetween size="l">
      <Calculator />
      <PinnedResults />
    </SpaceBetween>
  );
}
