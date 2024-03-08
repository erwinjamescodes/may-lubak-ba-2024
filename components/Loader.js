import React from "react";
import Logo from "../assets/lubak-logo.png";
import Image from "next/image";

const Loader = () => {
	return (
		<div className="flex justify-center items-center  h-svh flex-col">
			<div className=" h-svh bg-container absolute"></div>
			<Image
				src={Logo}
				alt="Lubak Tracker Logo"
				height={60}></Image>
			<h1 className="text-lg ">Welcome to </h1>
			<h1 className="text-4xl uppercase font-bold">May Lubak Ba?</h1>
			<span class="loader mt-10"></span>
			<h1 className="text-lg mt-4">Loading map. Please wait...</h1>
		</div>
	);
};

export default Loader;
