import React from "react";
import HeaderMain from '../components/common/headerMain';
import Footer from '../components/common/footer';
import LeftSidebar from '../components/common/dashBoardSideBars/leftbar';
import RightSidebar from '../components/common/dashBoardSideBars/rightbar';
import Dashboard from '../components/common/dashboard';

const DashboardPage = () => {
  return (
    <div>
      <HeaderMain />
        <LeftSidebar />
        <Dashboard />
        <RightSidebar />
      <Footer />
    </div>
  );
};

export default DashboardPage;