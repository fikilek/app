export const fsValidationData = {
	meter: {
		installationValidationData: {
			meterInstallation: {
				location: {
					premises: {
						//inside/outside
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					insideBox: {
						//inside/outside
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					exactLocation: {
						//['pole top', pole bottom', 'stand alone', 'other']
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				serviceConnection: {
					connection: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				keyPad: {
					serialNo: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					photos: ["Photo 1 url", "Photo 2 url"],
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				photos: ["Photo 1", "Photo 2"],
				linkedCb: {
					isLinkedToCb: {
						// yes/no
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					cbNo: {
						constraints: [{ required: "yes", condition: "isLinkedToCb:yes" }],
						verdict: "",
					},
				},
				linkedSeal: {
					isLinkedToSeal: {
						// yes/no
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					sealNo: {
						constraints: [{ required: "yes", condition: "isLinkedToCb:yes" }],
						verdict: "",
					},
				},
			},
		},

		commissioningValidationData: {
			meterCommissionig: {
				voltageReading: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				meterReading: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				confirmInstallationData: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				comments: {
					constraints: [{ required: "", condition: "no" }],
					verdict: "",
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			},
		},

		auditValidationData: {
			meterInstallation: {
				location: {
					premises: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					insideBox: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					exactLocation: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				serviceConnection: {
					connection: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				keyPad: {
					serialNo: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},
	},
	cb: {
		installationValidationtionData: {
			cbInstallation: {
				location: {
					premises: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					insideBox: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					exactLocation: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				linkedMeter: {
					isLinkedToMeter: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					meterNo: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},

		commissioningValidationData: {
			cbCommissioning: {
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				cbSizeVerified: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				cbMeterLinkVerified: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			},
		},

		auditValidationData: {
			cbInstallation: {
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				linkedMeterNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			},
		},
	},
	seal: {
		installationValidationtionData: {
			sealInstallation: {
				linkedMeterNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},

		commissioningValidationtionData: {
			sealCommissioning: {
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				sealNoVerified: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealMeterLinkVerified: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealLocked: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			},
		},

		auditValidationData: {
			sealInstallation: {
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				linkedMeterNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			},
		},
	},
	box: {
		installationValidationtionData: {
			boxInstallation: {
				location: {
					exactLocation: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					premises: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},

		commissioningValidationtionData: {
			boxCommissioning: {
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				installationDataVerified: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			},
		},

		auditValidationData: {
			boxInstallation: {
				location: {
					exactLocation: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					premises: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},
	},
	pole: {
		installationValidationtionData: {
			poleInstallation: {
				location: {
					premises: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},

		commissioningValidationtionData: {
			poleCommissioning: {
				installationDataVerified: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},

		auditValidationData: {
			poleInstallation: {
				location: {
					premises: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				astAdr: {
					adr: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					gps: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				confirmations: {
					confirmTrn: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
		},
	},
};
