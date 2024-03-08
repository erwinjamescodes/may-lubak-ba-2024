import React from "react";
import { Marker, Popup } from "react-map-gl";
import useViewportStore from "../store/viewportStore";
import useUserStore from "../store/userStore";
import { Room } from "@material-ui/icons";
import Router from "next/router";

const AddPin = ({
	newPlace,
	setNewPlace,
	handleSubmit,
	setIntensity,
	isAdding,
}) => {
	const viewport = useViewportStore();
	const { currentUser } = useUserStore();

	return (
		<>
			<Marker
				latitude={newPlace.lat}
				longitude={newPlace.long}
				offsetLeft={-3.5 * viewport.zoom}
				offsetTop={-7 * viewport.zoom}>
				<Room
					style={{
						fontSize: 3 * viewport.zoom,
						color: "tomato",
						cursor: "pointer",
					}}
				/>
			</Marker>

			<Popup
				latitude={newPlace.lat}
				longitude={newPlace.long}
				closeButton={true}
				closeOnClick={true}
				onClose={() => {
					setNewPlace(null);
					setIntensity(1);
				}}
				anchor="bottom">
				{currentUser ? (
					<div className="w-[200px] h-[180px] p-1 rounded-md">
						<form
							onSubmit={handleSubmit}
							className="h-[100%] flex flex-col justify-around">
							<h1 className="text-md">Report New</h1>
							<label className="font-bold text-lg">Lubak Intensity</label>
							<select
								onChange={(e) => setIntensity(e.target.value)}
								className="p-3 rounded-md text-lg bg-gray-100 ">
								<option value={1}>Minor</option>
								<option value={2}>Moderate</option>
								<option value={3}>Severe</option>
								<option value={4}>Extreme</option>
								<option value={5}>No longer passable</option>
							</select>
							<button
								type="submit"
								className="bg-[tomato]  py-1 rounded-md text-white font-bold text-lg">
								{isAdding ? "Adding..." : "Add Pin"}
							</button>
						</form>
					</div>
				) : (
					<div className="min-h-[120px] flex items-center p-4 flex-col">
						<p className="text-center text-lg">
							Please login to report a new pothole.
						</p>
						<div className="flex flex-col w-full gap-2 mt-2">
							<button
								onClick={() => {
									Router.push({ pathname: "/login" });
								}}
								className={`z-50 max-h-[50px] bg-[#ff5c36] px-3 py-1 rounded-md   text-white font-semibold `}>
								Login
							</button>
						</div>
					</div>
				)}
			</Popup>
		</>
	);
};

export default AddPin;
