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
				no: "", // validation : required
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
				height: "", // vaidation : required
				code: "",
				type: "",
			},
		},
	},
};
