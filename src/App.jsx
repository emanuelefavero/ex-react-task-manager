import { BrowserRouter, Route, Routes } from 'react-router';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import { AddTask } from './pages/AddTask';
import { TaskList } from './pages/TaskList';
import { RootLayout } from './RootLayout';
import { PATHS } from './router/paths';

const providers = [GlobalContextProvider, BrowserRouter, Routes];

const Nest = ({ providers, children }) =>
  providers.reduceRight(
    (nested, Provider) => <Provider>{nested}</Provider>,
    children,
  );

export const App = () => {
  return (
    <Nest providers={providers}>
      <Route path={PATHS.HOME} element={<RootLayout />}>
        <Route index element={<TaskList />} />
        <Route path={PATHS.ADD_TASK} element={<AddTask />} />
      </Route>
    </Nest>
  );
};
