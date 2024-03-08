import React, { useState } from "react";
import useWindowSize from "../utils/useWindowSize";
import MenuIcon from "@mui/icons-material/Menu";
import Geocoder from "react-mapbox-gl-geocoder";
import useViewportStore from "../store/viewportStore";
import useUserStore from "../store/userStore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Router from "next/router";
import useSidebarStore from "../store/sidebarStore";
import ProfileIcon from "../assets/profile.svg";
import Image from "next/image";
import { Auth } from "aws-amplify";

const HeaderSearch = ({ mymap }) => {
	const { width } = useWindowSize();
	const viewport = useViewportStore();
	const { currentUser } = useUserStore();
	const { setSidebarOpen } = useSidebarStore();

	//Menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleAccountClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleAccountClose = () => {
		setAnchorEl(null);
	};

	const formatEmail = (email) => {
		const formatted = email?.split("@")[0];
		return formatted;
	};

	const appSignOut = () => {
		Auth.signOut().then(() => {
			window.location.reload();
		});
	};

	return (
		<div className="flex justify-center w-[100%]">
			<div className="absolute top-[16px] flex justify-between px-4 w-[100%] gap-4">
				<div
					className="w-[100%] bg-white z-30 px-[16px]  flex rounded-md items-start "
					id="geocoder-id">
					{width > 1024 ? (
						<SearchIcon sx={{ marginTop: "12px" }} />
					) : (
						<MenuIcon
							sx={{ marginTop: "12px" }}
							onClick={(e) => {
								e.stopPropagation();
								setSidebarOpen();
							}}
						/>
					)}
					<Geocoder
						mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_URL}
						onSelected={(newViewport, item) => {
							mymap.easeTo({
								center: [newViewport.longitude, newViewport.latitude],
								duration: 800,
								zoom: 14,
							});
						}}
						viewport={viewport}
						hideOnSelect={true}
						initialInputValue={" "}
						updateInputOnSelect={true}
					/>
					<Image
						src={ProfileIcon}
						alt="Lubak Tracker Logo"
						height={30}
						onClick={handleAccountClick}
						className="mt-[10px] lg:hidden"></Image>

					<Menu
						className="lg:hidden"
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleAccountClose}
						onClick={handleAccountClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
						{!currentUser ? (
							<div>
								<MenuItem
									onClick={() => {
										Router.push({ pathname: "/login" });
									}}
									className="flex justify-end">
									Login
								</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem className="hover:bg-white cursor-auto flex justify-end">
									Hi, {formatEmail(currentUser)}!
								</MenuItem>
								<MenuItem
									onClick={() => {
										appSignOut();
									}}
									className="flex justify-end">
									Logout
								</MenuItem>
							</div>
						)}
					</Menu>
				</div>

				<button
					onClick={() => {
						Router.push({ pathname: "/login" });
					}}
					className={`z-50 max-h-[50px] bg-[green] px-3 rounded-md hidden  text-white font-semibold ${
						currentUser === null ? "lg:block" : "lg:hidden"
					}`}>
					Login
				</button>

				<button
					onClick={handleAccountClick}
					className={`z-50 max-h-[50px] bg-[green] px-3 rounded-md  text-white hidden font-semibold whitespace-nowrap cursor-pointer ${
						currentUser === null ? "" : "lg:flex items-center justify-center"
					}`}>
					Hi, {formatEmail(currentUser)}!
				</button>
				<Menu
					className="hidden lg:block"
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleAccountClose}
					onClick={handleAccountClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&:before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
					<MenuItem
						onClick={() => {
							appSignOut();
						}}>
						Logout
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
};

export default HeaderSearch;
