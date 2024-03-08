import React, { useEffect, useState } from "react";
import axios from "axios";
import Map, { useMap, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useViewportStore from "../store/viewportStore";
import useUserStore from "../store/userStore";
import useLoadingStore from "../store/loadingStore";
import HeaderSearch from "./HeaderSearch";
import DisplayPins from "./DisplayPins";
import AddPin from "./AddPin";
import Loader from "../components/Loader";
export default function LubakMap({}) {
	const viewport = useViewportStore();
	const { currentUser } = useUserStore();
	const { isFetchingPins, setIsFetchingPins } = useLoadingStore();
	const [pins, setPins] = useState([]);
	const [newPlace, setNewPlace] = useState(null);
	const [intensity, setIntensity] = useState(1);
	const [currentPlaceId, setCurrentPlaceId] = useState(null);
	const [clickedAPin, setClickedAPin] = useState(false);
	const [status, setStatus] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const { mymap } = useMap();

	useEffect(() => {
		const getPins = async () => {
			setIsFetchingPins(true);

			try {
				const REQUEST_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/getPins`;
				const response = await axios.get(REQUEST_URL, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				setPins(response.data.pins);
				setIsFetchingPins(false);
			} catch (error) {
				console.error("Error fetching pins:", error);
				setIsFetchingPins(false);
			}
		};
		getPins();
	}, []);

	//FUNCTIONS
	const handleAddClick = (e) => {
		setCurrentPlaceId(null);
		const { lng, lat } = e.lngLat;

		setNewPlace((prev) => ({ ...prev, long: lng, lat: lat }));
		mymap.easeTo({
			center: [lng, lat],
			duration: 800,
			// zoom: 14,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsAdding(true);
		const newPin = {
			email: currentUser,
			intensity: intensity,
			isFixed: false,
			lat: newPlace.lat,
			long: newPlace.long,
		};
		try {
			const REQUEST_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/createPin`;
			const response = await axios.post(REQUEST_URL, newPin, {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("LubakToken"),
				},
			});

			if (response.status === 201) {
				setPins([...pins, response.data.pin]);
				setNewPlace(null);
				setIntensity(1);
			}
		} catch (error) {
			console.error("Error creating pin:", error);
		}
		setIsAdding(false);
	};

	const handlePinClick = (id, long, lat) => {
		setClickedAPin(true);
		setCurrentPlaceId(id);
		mymap.easeTo({
			center: [long, lat],
			duration: 800,
			zoom: 14,
		});
	};

	const closePopupOnOutsideClick = () => {
		setClickedAPin(false);
		setIntensity(1);
		if (currentPlaceId) {
			!clickedAPin ? setCurrentPlaceId(null) : null;
		}
	};

	const handleUpdateStatus = async (status) => {
		setIsUpdating(true);
		const params = {
			email: currentUser,
			id: currentPlaceId,
			isFixed: status,
			intensity: intensity,
		};
		try {
			const REQUEST_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/updatePin`;
			const response = await axios.put(REQUEST_URL, params, {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("LubakToken"),
				},
			});

			if (response.status === 200) {
				const currentPin = pins.filter((pin) => pin.id === currentPlaceId)[0];

				const updatedPin = {
					...currentPin,
					isFixed: status,
					intensity: intensity,
				};

				setPins((prev) =>
					prev.map((pin) => (pin.id === currentPlaceId ? updatedPin : pin))
				);
				setStatus(false);
				setCurrentPlaceId(null);
				setIntensity(1);
			}
		} catch (err) {
			console.log("Error!", err);
		}
		setIsUpdating(false);
	};

	const handleDeleteClick = async (email, id) => {
		setIsDeleting(true);
		try {
			const REQUEST_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/deletePin`;
			const response = await axios.delete(REQUEST_URL, {
				params: {
					email: email,
					id: id,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("LubakToken"),
				},
			});

			if (response.status === 200) {
				setPins(pins.filter((pin) => pin.id !== id));
			}
		} catch (error) {
			console.error("Error deleting pin:", error);
		}
		setIsDeleting(false);
	};

	return (
		<>
			<main className=" w-[100%] h-[100vh] bg-white">
				<HeaderSearch mymap={mymap} />
				<div className="map w-[100%] h-[100%]">
					{isFetchingPins ? (
						<Loader />
					) : (
						<Map
							id="mymap"
							initialViewState={{ ...viewport }}
							style={{ width: "100%", height: "100%" }}
							mapStyle="mapbox://styles/mapbox/streets-v9"
							mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_URL}
							renderWorldCopies={false}
							doubleClickZoom={false}
							onDblClick={(e) => {
								handleAddClick(e);
							}}
							onClick={() => {
								closePopupOnOutsideClick();
							}}>
							<DisplayPins
								pins={pins}
								intensity={intensity}
								setIntensity={setIntensity}
								currentPlaceId={currentPlaceId}
								setCurrentPlaceId={setCurrentPlaceId}
								handlePinClick={handlePinClick}
								handleUpdateStatus={handleUpdateStatus}
								setStatus={setStatus}
								status={status}
								handleDeleteClick={handleDeleteClick}
								isUpdating={isUpdating}
								isDeleting={isDeleting}
							/>
							{newPlace !== null && (
								<AddPin
									newPlace={newPlace}
									setNewPlace={setNewPlace}
									handleSubmit={handleSubmit}
									setIntensity={setIntensity}
									handleDeleteClick={handleDeleteClick}
									isAdding={isAdding}
								/>
							)}
							<GeolocateControl
								position="bottom-right"
								showAccuracyCircle={false}
							/>
						</Map>
					)}
				</div>
			</main>
		</>
	);
}
