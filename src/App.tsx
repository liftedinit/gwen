import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  Account,
  Flow,
  Flows,
  Home,
  Layout,
  ModuleSettings,
  Settings,
  SignIn,
  Users,
  Splash,
} from "./views";
import { useProfileContext } from "./providers/ProfileProvider";

const ONE_SECOND = 1 * 1000;

function App() {
  const { profile } = useProfileContext();
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
    let id = setTimeout(() => setShowSplash(false), ONE_SECOND);
    return () => clearTimeout(id);
  }, []);

  if (showSplash) {
    return <Splash />;
  }
  if (!profile) {
    return <SignIn />;
  }
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
