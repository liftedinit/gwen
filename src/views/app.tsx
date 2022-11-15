import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  Account,
  Flow,
  Flows,
  Home,
  Layout,
  Services,
  ServiceSettings,
  Users,
  Splash,
} from "views";

const ONE_SECOND = 1 * 1000;

export function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
    let id = setTimeout(() => setShowSplash(false), ONE_SECOND);
    return () => clearTimeout(id);
  }, []);

  if (showSplash) {
    return <Splash />;
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
          <Route index element={<Services />} />
          <Route path=":service" element={<ServiceSettings />} />
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
