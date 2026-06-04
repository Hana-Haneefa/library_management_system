function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="container w-full h-screen flex">
        <div className="sidenav w-1/6 h-full bg-violet-900"></div>
        <div className="main-content w-5/6 h-full bg-violet-950 flex flex-col gap-2">
          <div className="topNav w-full h-14 bg-violet-900"></div>

          <div className="cards w-full h-50 border grid grid-cols-5 gap-4 p-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="graphs grid h-auto grid-cols-2 gap-4 p-4 border">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
