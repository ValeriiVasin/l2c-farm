import AppLayout from '@awsui/components-react/app-layout';
import { Route, Routes } from 'react-router-dom';
import { Farm } from './components/farm/farm';

export function App() {
  return <AppLayout content={<Content />} navigationHide toolsHide></AppLayout>;
}

function Content() {
  return (
    <Routes>
      <Route index element={<Farm />} />
    </Routes>
  );
}
