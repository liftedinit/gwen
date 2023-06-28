import { Blocks, Compute, Data, Layout, Ledger, Neighborhoods, Services } from "pages";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Splash, Users } from "views";

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
        <Route index element={<Neighborhoods />} />
        <Route path="settings">
          <Route index element={<Services />} />
          <Route path="blocks" element={<Blocks />} />
          <Route path="compute" element={<Compute />} />
          <Route path="ledger" element={<Ledger />} />
          <Route path="data" element={<Data />} />
        </Route>
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
