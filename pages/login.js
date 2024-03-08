import React from "react";
import { Auth } from "aws-amplify";
import Logo from "../assets/lubak-logo.png";
import Google from "../assets/google.png";
import Image from "next/image";
import Router from "next/router";

const login = () => {
	return (
		<div className="bg-white h-svh w-[100%] flex items-center justify-center px-4 ">
			<div className=" h-svh bg-container absolute"></div>
			<div className="bg-white shadow-xl max-w-[600px] w-[100%] flex justify-center flex-col items-center rounded-md z-40 py-10">
				<div className="flex flex-col items-center mb-4 ">
					<Image
						src={Logo}
						alt="Lubak Tracker Logo"
						className="cursor-pointer"
						height={50}
						onClick={() => {
							Router.push({ pathname: "/" });
						}}></Image>
					<h4
						className="text-sm font-semibold cursor-pointer"
						onClick={() => {
							Router.push({ pathname: "/" });
						}}>
						Welcome to
					</h4>
					<h1
						className="text-2xl uppercase font-semibold cursor-pointer"
						onClick={() => {
							Router.push({ pathname: "/" });
						}}>
						May Lubak Ba?
					</h1>
				</div>
				<div className="mt-2 px-10  w-full justify-center ">
					<h2 className="font-semibold uppercase text-xl p-4 w-full text-center border-t border-solid border-gray-200 ">
						Login to report a pin
					</h2>
				</div>
				<div className="flex flex-col justify-center items-center gap-4 w-[100%] px-6 lg:px-10 ">
					<button
						className="bg-[#ff5c36] w-full p-4 rounded-md text-white"
						onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
						<div className="flex justify-center gap-2">
							<Image
								src={Google}
								alt="Google Logo"
								height={25}></Image>{" "}
							<p className="text-md">Login with Google</p>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default login;
