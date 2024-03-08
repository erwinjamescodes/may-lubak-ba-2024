import { create } from "zustand";

const useUserStore = create((set) => ({
	currentUser: null,

	setCurrentUser: (name) =>
		set(() => ({
			currentUser: name,
		})),
}));

export default useUserStore;
