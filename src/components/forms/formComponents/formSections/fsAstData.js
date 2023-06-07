export const fsAstData = {
	meter: {
		astData: {
			astCartegory: "meter",
			astNo: "", // required
			astSerialNo: "",
			astState: "service",
			meter: {
				code: "",
				type: "", // required
				phase: "", // required
				manufacturer: "",
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
				code: "",
				type: "",
				size: "", // required
			},
		},
	},

	seal: {
		astData: {
			astCartegory: "seal",
			astNo: "", // required
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
				code: "",
				type: "", // required
				color: "",
				dimensions: {
					lenght: "",
					width: "",
					height: "",
				},
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
				code: "",
				type: "", // required
				length: "", //  required
			},
		},
	},
};



