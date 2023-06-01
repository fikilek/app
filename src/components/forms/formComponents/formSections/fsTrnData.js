export const fsTrnData = {
	meter: {
		installationData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				isThereKeyPad: "",
				serialNo: "",
				kyPadPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			voltageReading: {
				phase1: "",
				phase2: "",
				phase3: "",
				voltageReadingPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			linkedCb: {
				isThereCb: "",
				cbSize: "",
			},
			linkedSeal: {
				isThereSeal: "",
				sealNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1", "Photo 2"],
		},

		commissioningData: {
			voltageReading: "",
			meterReading: "",
			confirmInstallationData: "",
			comments: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				isThereKeyPad: "",
				serialNo: "",
				kyPadPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			voltageReading: {
				phase1: "",
				phase2: "",
				phase3: "",
				voltageReadingPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			linkedCb: {
				isThereCb: "",
				cbSize: "",
			},
			linkedSeal: {
				isThereSeal: "",
				sealNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1", "Photo 2"],
		},
	},

	cb: {
		installationData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			linkedMeter: {
				isLinkedToMeter: "",
				meterNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			cbSizeVerified: "",
			cbMeterLinkVerified: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
	},

	seal: {
		installationData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			sealNoVerified: "",
			sealMeterLinkVerified: "",
			sealLocked: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
	},

	box: {
		installationData: {
			location: {
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			boxLock: {
				lockable: "",
				isLocked: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Box Photo 1", "Box Photo 2", "Box Photo 3"],
		},

		commissioningData: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			boxLock: {
				lockable: "",
				isLocked: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Box Photo 1", "Box Photo 2", "Box Photo 3"],
		},
	},

	pole: {
		installationData: {
			location: {
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				premises: "", //['inside', 'outside']
			},
			poleCondition: {
				leaning: "",
				health: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			streetLamp: {
				hasAttachedLamp: "",
				lampNo: "",
			},
			box: {
				hasAttacheBox: "",
				boxNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
	},
};
