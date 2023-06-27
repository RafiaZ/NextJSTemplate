import React, { useEffect, useState } from "react";
import Overview from '../../app/components/overview/Overview'
import Chart from '../../app/components/Chart'
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [mobileWidth, setMobileWidth] = useState<any>(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobileWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsVisible(mobileWidth && mobileWidth >= 800);
  }, [mobileWidth]);


  const handleDrawer = () => {
    setIsVisible(!isVisible);
  };



  return (
    <section className="dashboard container container-space ">
      <div className="menuDiv">
        <img
          className="menuIcon"
          src="https://cdn.icon-icons.com/icons2/2596/PNG/512/hamburger_button_menu_icon_155296.png"
          alt="open drawer"
          onClick={handleDrawer}
        />
      </div>

      <div className={isVisible ? "left trans-0" : "left trans-100"}>
        <div className="headingBack">
          <p className="heading text-4xl font-bold text-gray-80">DASHBOARD</p>
          <div className="backBtn-div" onClick={handleDrawer}>
            <h1>{"<"}</h1>
          </div>
        </div>
        <ul className="sidebarPAdding">
          <li
            className={`${activeTab === "tab1" ? "tab activetab" : "tab"}`}
            onClick={() => handleTabChange("tab1")}>
            OVERVIEW
          </li>
          <li
            className={`${activeTab === "tab2" ? "tab activetab" : "tab"}`}
            onClick={() => handleTabChange("tab2")}>
            CHARTS
          </li>
       
        </ul>
      </div>

      <div className="right">
        {activeTab === "tab1" &&
          <h1>
            <Overview />
          </h1>}
        {activeTab === "tab2" && <div>
          <Chart/>
          </div>}
    
      </div>
    </section>
  );
};

export default Dashboard;
