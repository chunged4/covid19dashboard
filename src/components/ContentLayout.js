import React from "react";
import Map from "./Map";
import Bargraph from "./Bargraph";
import AreaGraph from "./AreaGraph";
import DataTable from "./DataTable";
import "../styles/content-layout.css";

const ContentLayout = () => {
	return (
		<div className="content-layout">
			<div className="map-area">
				<Map />
			</div>
			<div className="table-area">
				<DataTable />
			</div>
			<div className="histogram-area">
				<Bargraph />
			</div>
			<div className="bargraph-area">
				<AreaGraph />
			</div>
		</div>
	);
};

export default ContentLayout;
