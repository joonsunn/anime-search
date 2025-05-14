import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: "100vw", alignItems: "center" }}
    >
      <div>Header</div>
      <div style={{ flexGrow: 1, padding: 4 }}>
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
}

export default BaseLayout;
