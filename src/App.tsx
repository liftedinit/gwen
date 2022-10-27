import { Outlet, Route, Routes } from "react-router-dom";
import {
  Account,
  Flow,
  Flows,
  Home,
  Layout,
  ModuleSettings,
  Settings,
  Users,
} from "./views";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Home />} />
        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path=":module" element={<ModuleSettings />} />
        </Route>
        <Route path="flows">
          <Route index element={<Flows />} />
          <Route path=":flow" element={<Flow />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
