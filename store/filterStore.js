import { create } from "zustand";

const useFilterStore = create((set) => ({
	intensityFilter: 0,
	statusFilter: [],
	submissionFilter: false,

	// Intensity filter
	setIntensityFilter: (intensity) =>
		set(() => ({
			intensityFilter: intensity,
		})),

	// Status filter
	setStatusFilter: (status) =>
		set((state) => ({ statusFilter: [...state.statusFilter, status] })),
	removeStatusFilter: (status) =>
		set((state) => ({
			statusFilter: state.statusFilter.filter((stat) => stat !== status),
		})),
	resetStatusFilter: () => {
		set(() => ({ statusFilter: [] }));
	},

	// Submission filter
	setSubmissionFilter: () =>
		set((state) => ({ submissionFilter: !state.submissionFilter })),
	resetSubmissionFilter: () => {
		set(() => ({ submissionFilter: false }));
	},
}));

export default useFilterStore;
