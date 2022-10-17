import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "pages/Seller/components/sidebar/Sidebar";
import SeasonalChart from "pages/Seller/components/SeasonalChart/Chart"

const About = () => {
  return (
    <div className='md:flex md:justify-center md:align-center md:mx-4'>
      <div className='container'>
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User" /> */}
          <SeasonalChart grid />
          {/* <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div> */}
        </div>
      </div>
    </div>
  );
}


export default function SellerDashboard() {

  return (
    <>
      {/* <Topbar /> */}
      <About />
    </>
  )

}