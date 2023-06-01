export const fsValidationData = {
	meter: {
		installationValidationData: {
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
			keyPad: {
				isThereKeyPad: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				serialNo: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereKeyPad: "yes",
							},
						},
					],
					verdict: "",
				},
				kyPadPhotos: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereKeyPad: "yes",
							},
						},
					],
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
			voltageReading: {
				phase1: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				phase2: {
					constraints: [{ required: "condition", condition: "" }],
					verdict: "",
				},
				phase3: {
					constraints: [{ required: "condition", condition: "" }],
					verdict: "",
				},
				voltageReadingPhotos: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			linkedCb: {
				isThereCb: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				cbSize: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereCb: "yes",
							},
						},
					],
					verdict: "",
				},
			},
			linkedSeal: {
				isThereSeal: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealNo: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereSeal: "yes",
							},
						},
					],
					verdict: "",
				},
			},

			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationData: {
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
				constraints: [{ required: "condition", condition: "no" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
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
			keyPad: {
				isThereKeyPad: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				serialNo: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereKeyPad: "yes",
							},
						},
					],
					verdict: "",
				},
				kyPadPhotos: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereKeyPad: "yes",
							},
						},
					],
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
			voltageReading: {
				phase1: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				phase2: {
					constraints: [{ required: "condition", condition: "" }],
					verdict: "",
				},
				phase3: {
					constraints: [{ required: "condition", condition: "" }],
					verdict: "",
				},
				voltageReadingPhotos: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			linkedCb: {
				isThereCb: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				cbSize: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereCb: "yes",
							},
						},
					],
					verdict: "",
				},
			},
			linkedSeal: {
				isThereSeal: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealNo: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereSeal: "yes",
							},
						},
					],
					verdict: "",
				},
			},

			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			// astData

			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			meter: {
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				phase: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				manufacturer: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},
	},

	cb: {
		installationValidationtionData: {
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
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationData: {
			cbSizeVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			cbMeterLinkVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			// installation data
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
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			// astData
			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			cb: {
				size: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
		},
	},

	seal: {
		installationValidationtionData: {
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
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationtionData: {
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
			photos: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
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
			// astData
			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			seal: {
				no: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},
	},

	box: {
		installationValidationtionData: {
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
			boxLock: {
				lockable: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				isLocked: {
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
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationtionData: {
			installationDataVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
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
			boxLock: {
				lockable: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				isLocked: {
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
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			// astData
			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			box: {
				dimensions: {
					lenght: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					width: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					height: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				color: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},
	},

	pole: {
		installationValidationtionData: {
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
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationtionData: {
			installationDataVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			location: {
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			poleCondition: {
				leaning: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				health: {
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
			streetLamp: {
				hasAttachedLamp: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				lampNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			box: {
				hasAttacheBox: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				boxNo: {
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
			photos: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			// astData
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			pole: {
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
		},
	},
};
