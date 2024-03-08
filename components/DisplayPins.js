import React, { useState } from "react";
import useFilterStore from "../store/filterStore";
import useViewportStore from "../store/viewportStore";
import useUserStore from "../store/userStore";
import { pinColorScheme } from "../utils/pinColorScheme";
import { Marker, Popup } from "react-map-gl";
import * as timeago from "timeago.js";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { legend } from "../utils/intensityLegend";

const DisplayPins = ({
	pins,
	intensity,
	setIntensity,
	setStatus,
	status,
	currentPlaceId,
	setCurrentPlaceId,
	handlePinClick,
	handleUpdateStatus,
	handleDeleteClick,
	isUpdating,
	isDeleting,
}) => {
	const viewport = useViewportStore();
	const { intensityFilter, statusFilter, submissionFilter } = useFilterStore();
	const { currentUser } = useUserStore();

	return (
		<>
			{pins?.length === 0 ? (
				<></>
			) : (
				<>
					{pins
						?.filter((pin) =>
							intensityFilter === 0 ? pin : intensityFilter === +pin.intensity
						)
						?.filter((pin) =>
							statusFilter.length === 0
								? pin
								: statusFilter.includes(pin.isFixed.toString())
						)
						?.filter((pin) => {
							return submissionFilter ? currentUser === pin.email : pin;
						})
						.map((pin, index) => (
							<div key={index}>
								<Marker
									key={pin._id}
									longitude={pin.long}
									latitude={pin.lat}
									offsetLeft={-2.5 * viewport.zoom}
									offsetTop={-7 * viewport.zoom}
									anchor="center"
									onClick={(event) => {
										handlePinClick(pin.id, pin.long, pin.lat, event);
									}}>
									{pin.isFixed === "true" ? (
										<CheckCircleIcon
											style={{
												color: "green",
												fontSize: viewport.zoom * 2,
												cursor: "pointer",
											}}
										/>
									) : (
										<WarningIcon
											style={{
												color: pinColorScheme(+pin.intensity),
												fontSize: viewport.zoom * 2,
												cursor: "pointer",
											}}
										/>
									)}
								</Marker>
								{pin.id === currentPlaceId && (
									<Popup
										key={`popup-${pin._id}`}
										latitude={pin.lat}
										longitude={pin.long}
										closeButton={true}
										closeOnClick={false}
										onClose={(e) => {
											setCurrentPlaceId(null);
											setIntensity(1);
										}}
										anchor="bottom">
										<div className="w-[200px] min-h-[120px] p-1 rounded-md  flex flex-col justify-around gap-3">
											<h1 className="text-md">
												Reported {timeago.format(pin.timeReported)}
											</h1>
											{currentUser === pin.email ? (
												<>
													<label className="font-bold text-md">
														Edit Intensity and Status
													</label>
													<select
														onChange={(e) => setIntensity(e.target.value)}
														className="px-3 py-2 rounded-md text-lg bg-gray-100">
														<option value={1}>Minor</option>
														<option value={2}>Moderate</option>
														<option value={3}>Severe</option>
														<option value={4}>Extreme</option>
														<option value={5}>No longer passable</option>
													</select>
													<select
														onChange={(e) => setStatus(e.target.value)}
														className="px-3 py-2 rounded-md text-lg focus:border-none bg-gray-100">
														<option value="false">
															Still there... &#128557;
														</option>
														<option value="true">Fixed! &#128526;</option>
													</select>
													<button
														type="submit"
														className="bg-[green]  py-1 rounded-md text-white font-bold text-lg"
														onClick={() => handleUpdateStatus(status)}>
														{isUpdating ? "Updating..." : "Update Pin"}
													</button>
												</>
											) : (
												<>
													<h2
														className={`p-3 rounded-md text-lg ${
															pin.intensity === 1 ? "text-black" : "text-white"
														}`}
														style={{
															backgroundColor: pinColorScheme(+pin.intensity),
														}}>
														{legend
															.filter(
																(item) => item.intensity === +pin.intensity
															)
															.map((item) => item.label)}
													</h2>
													<h2
														className={`p-3 rounded-md text-lg text-white ${
															pin.isFixed ? "bg-[green]" : "bg-[tomato]"
														}`}>
														{pin.isFixed ? (
															<>Fixed! &#128526;</>
														) : (
															<>Still there... &#128557;</>
														)}
													</h2>
												</>
											)}
											{currentUser === pin.email ? (
												<button
													type="submit"
													className="bg-[red]  py-1 rounded-md text-white font-bold text-lg"
													onClick={() => handleDeleteClick(pin.email, pin.id)}>
													{isDeleting ? "Deleting..." : "Delete Pin"}
												</button>
											) : null}
										</div>
									</Popup>
								)}
							</div>
						))}
				</>
			)}
		</>
	);
};

export default DisplayPins;
