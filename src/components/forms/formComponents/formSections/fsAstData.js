export const fsAstData = {
	meter: {
		astData: {
			astCartegory: "meter",
			astNo: "", // vaidation : required
			astSerialNo: "",
			astState: "service",
			meter: {
				code: "",
				phase: "", //['single','three'] // vaidation : required
				type: "", // ['connventional', 'pre-paid'] // vaidation : required
				manufacturer: '', //['conlog','landis',et]
			},
		},
	},

	cb: {
		astData: {
			astCartegory: "cb",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			cb: {
				size: "", // vaidation : required
				code: "",
				type: "", // vaidation : required
			},
		},
	},

	seal: {
		astData: {
			astCartegory: "seal",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			seal: {
				code: "",
				type: "",
			},
		},
	},

	box: {
		astData: {
			astCartegory: "box",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			box: {
				dimensions: {
					lenght: "",
					width: "",
					height: "",
				},
				code: "",
				type: "", // vaidation : required
				color: "",
			},
		},
	},
	
	pole: {
		astData: {
			astCartegory: "pole",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			pole: {
				length: "", // validation required
				code: "",
				type: "", // validation required -  ['wood','metal', 'cement' , etc]
			},
		},
	},
};
