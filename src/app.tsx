import AppLayout from '@awsui/components-react/app-layout';
import SpaceBetween from '@awsui/components-react/space-between';
import { Calculator } from './components/calculator/calculator';
import { PinnedResults } from './components/pinned-results/pinned-results';

export function App() {
  return (
    <AppLayout
      content={
        <SpaceBetween size="l">
          <Calculator />
          <PinnedResults />
        </SpaceBetween>
      }
      navigationHide
      toolsHide
    ></AppLayout>
  );
}
