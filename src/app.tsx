import AppLayout from '@awsui/components-react/app-layout';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Exp } from './components/exp/exp';
import { Farm } from './components/farm/farm';

export function App() {
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('awsui-dark-mode', isDarkMode);
  }, []);

  return <AppLayout content={<Content />} navigationHide toolsHide></AppLayout>;
}

function Content() {
  return (
    <Routes>
      <Route path="exp" element={<Exp />} />
      <Route index element={<Farm />} />
    </Routes>
  );
}
