const getTrnComSection = astCat => {
	// console.log(`astCatIndex`, astCatIndex)

	switch (astCat) {
		case "meter":
			return {
				meterCommissioning: {
					voltageReading: "",
					meterReading: "",
					confirmInstallationData: "",
					comments: "",
					photos: ["Photo 1 url", "Photo 2 url"],
					confirmations: {
						confirmTrn: "",
					},
				},
			};

		case "box":
			return {
				boxCommissioning: {
					confirmations: {
						confirmTrn: "",
					},
					installationDataVerified: "",
					photos: ["Photo 1 url", "Photo 2 url"],
				},
			};

		case "cb":
			return {
				cbCommissioning: {
					confirmations: {
						confirmTrn: "",
					},
					cbSizeVerified: "",
					cbMeterLinkVerified: "",
					photos: ["Photo 1 url", "Photo 2 url"],
				},
			};

		case "seal":
			return {
				// sealCommissioning: {
				sealNoVerified: "",
				sealMeterLinkVerified: "",
				sealLocked: "",
				photos: ["Photo 1 url", "Photo 2 url"],
				confirmations: {
					confirmTrn: "",
				},
				// },
			};

		case "pole":
			return {
				poleCommissioning: {
					installationDataVerified: "",
					photos: ["Photo 1 url", "Photo 2 url"],
					confirmations: {
						confirmTrn: "",
					},
				},
			};

		default:
			return null;
	}
};

exports.getTrnComSection = getTrnComSection;
