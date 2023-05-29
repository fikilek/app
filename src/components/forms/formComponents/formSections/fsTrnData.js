export const fsTrnData = {
	meter: {
		// installationData: {
		meterInstallation: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				serialNo: "",
				photos: ["Photo 1 url", "Photo 2 url"],
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			linkedCb: {
				isLinkedToCb: "",
				cbNo: "",
			},
			linkedSeal: {
				isLinkedToSeal: "",
				sealNo: "",
			},
			voltageReading: {
				phase1: "",
				phase2: "",
				phase3: "",
			},
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1", "Photo 2"],
		},
		// },

		// commissioningData: {
		meterCommissioning: {
			voltageReading: "",
			meterReading: "",
			confirmInstallationData: "",
			comments: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
		// },

		// auditData: {
		meterInstallation: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				serialNo: "",
				photos: ["Photo 1 url", "Photo 2 url"],
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1", "Photo 2"],
			// },
		},
	},

	cb: {
		// installationData: {
		cbInstallation: {
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
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
			// },
		},

		commissioningData: {
			// sealCommissioning: {
			cbSizeVerified: "",
			cbMeterLinkVerified: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
			// },
		},

		auditData: {
			// cbInstallation: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
			// },
		},
	},

	seal: {
		installationData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			sealNoVerified: "",
			sealMeterLinkVerified: "",
			sealLocked: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
	},

	box: {
		// installationData: {
		boxInstallation: {
			location: {
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Box Photo 1", "Box Photo 2", "Box Photo 3"],
			// },
		},

		commissioningData: {
			// boxCommissioning: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
			// },
		},

		auditData: {
			// boxInstallation: {
			location: {
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Box Photo 1", "Box Photo 2", "Box Photo 3"],
			// },
		},
	},

	pole: {
		// installationData: {
		poleInstallation: {
			location: {
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: "",
			},
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
			// },
		},

		commissioningData: {
			// poleCommissioning: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
			// },
		},

		auditData: {
			// poleInstallation: {
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
				confirmTrn: "",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
		// },
	},
};
