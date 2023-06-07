// TODO: migrate all cloud functions to use Firebase 9

const trnComObj = require("./trnComObj");

require("firebase-functions/logger/compat");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const cloneDeep = require("lodash.clonedeep");
admin.initializeApp();
const db = getFirestore();

// const getTotalRecordsInCollection = async (col, astCat) => {
// 	const collectionRef = admin.firestore().collection(col);
// 	const query = collectionRef.where("astData.astCartegory", "==", astCat);
// 	const snapshot = await query.count().get();
// 	const collectionCount = snapshot.data().count;
// 	return collectionCount;
// };

exports.createSpl = functions.firestore
	.document("suppliers/{userId}")
	.onCreate(async (snap, context) => {
		const splRef = admin.firestore().collection("suppliers");
		await splRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				await docRef.update({ splNo: collectionSize });
				// console.log(`docRef`, docRef)
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createPo = functions.firestore
	.document("pos/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("pos");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ poNo: collectionSize });
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createMobileDevice = functions.firestore
	.document("mobile-devices/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("mobile-devices");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ deviceNo: collectionSize });
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createSimcard = functions.firestore
	.document("simcards/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("simcards");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ cardNo: collectionSize });
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createTrn = functions.firestore
	.document("trns/{userId}")
	.onCreate(async (snap, context) => {
		const trnRef = admin.firestore().collection("trns");
		await trnRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({
					"metaData.trnNo": collectionSize,
				});
				console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

// update po after user has signed (poApprove, receiver or witness) the po
// get po using po id and update the signed field (poApprove or receiver or witness) with user uid and timestamp
exports.signPo = functions.https.onCall(async (data, context) => {
	// functions.logger.log(`data:`, data);
	// functions.logger.log(`context:`, context);
	const { poId, signatureName, uid } = data;
	const docRef = db.collection("pos").doc(poId);
	// functions.logger.log(`docRef:`, docRef);
	const datetime = Timestamp.now();
	const displayName = context.auth.token.name;
	let updatedDoc = null;
	if (signatureName === "poApprove") {
		updatedDoc = await docRef.update({
			"poApprove.approveDate": datetime,
			"poApprove.approveUid": uid,
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		// functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (signatureName === "receiver") {
		updatedDoc = await docRef.update({
			"poData.poGrv.grvReceiver.grvReceiverDate": datetime,
			"poData.poGrv.grvReceiver.grvReceiverUid": uid,
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		// functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (signatureName === "witness") {
		updatedDoc = await docRef.update({
			"poData.poGrv.grvWitness.grvWitnessDate": datetime,
			"poData.poGrv.grvWitness.grvWitnessUid": uid,
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		// functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	return updatedDoc;
});

// update poInv or poPop
exports.updatePoInvPop = functions.https.onCall(async (data, context) => {
	// functions.logger.log(`data:`, data);
	// functions.logger.log(`context:`, context);
	const { poId, type, schData, transactionType } = data;
	const docRef = db.collection("pos").doc(poId);

	// functions.logger.log(`docRef:`, docRef);
	const datetime = Timestamp.now();
	const displayName = context.auth.token.name;
	let updatedDoc = null;
	if (type === "invoice" && transactionType === "add") {
		updatedDoc = await docRef.update({
			"poData.poInv": admin.firestore.FieldValue.arrayUnion(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "invoice" && transactionType === "remove") {
		updatedDoc = await docRef.update({
			"poData.poInv": admin.firestore.FieldValue.arrayRemove(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "payment" && transactionType === "add") {
		updatedDoc = await docRef.update({
			"poData.poPop": admin.firestore.FieldValue.arrayUnion(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "payment" && transactionType === "remove") {
		updatedDoc = await docRef.update({
			"poData.poPop": admin.firestore.FieldValue.arrayRemove(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	return updatedDoc;
});

const getAstsInTrn = trn => {
	if (!trn) return null;
	const { astData } = trn;
	// console.log(`astData`, astData);
	const astIdsInTrnArray = [];
	for (const astCat in astData) {
		// console.log(`astCat`, astCat);
		const astsArray = astData[astCat];
		// console.log(`astsArray`, astsArray);
		// console.log(`validationObject`, validationObject);
		// console.log(`index`, index)
		// iterate through astsArray to create validation obj
		astsArray &&
			astsArray.forEach((ast, astCatIndex) => {
				// console.log(`ast`, ast)
				// console.log(`astCatIndex`, astCatIndex)

				// extrac ast id info
				const trnObject = astData[astCat][astCatIndex];
				// console.log(`trnObject`, trnObject)

				// check if ast is flagged 'done'
				const isDone = trnObject.trnData.confirmations.confirmTrn;
				// console.log(`isDone`, isDone);

				// only push the array if its done
				if (isDone === "done") {
					// create ast tracking info
					const astTrackingInfo = {
						astId: trnObject.id,
						astCat: astCat,
						astIndex: astCatIndex,
						trnObject,
						astNo: trnObject.astData.astNo,
						trnNo: trn.metaData.trnNo,
						trnType: trn.metaData.trnType,
					};
					astIdsInTrnArray.push(astTrackingInfo);
				}
			});
	}
	return astIdsInTrnArray;
};

const updateAstsInTrn = (trn, newAstsState) => {
	if (!trn) return null;
	const { astData } = trn;
	// console.log(`astData`, astData);

	// clone trn.astData
	const astDataClone = cloneDeep(trn.astData)
	console.log(`astDataClone`, astDataClone)

	for (const astCat in astData) {
		console.log(`astCat`, astCat);
		const astsArray = astData[astCat];
		astsArray &&
			astsArray.forEach((ast, astCatIndex) => {
				console.log(`ast`, ast)
				console.log(`astCatIndex`, astCatIndex);

				// extrac ast id info
				const trnObject = astData[astCat][astCatIndex];
				console.log(`trnObject`, trnObject);

				// check if ast is flagged 'done'
				const isDone = trnObject.trnData.confirmations.confirmTrn;
				console.log(`isDone`, isDone);

				// only push the array if its done
				if (isDone === "done") {
					// create ast tracking info
					console.log(`newAstsState`, newAstsState);

					// extract the trnObject
					const updatedTrnObject = {
						...trnObject,
						astData: {
							...trnObject.astData,
							astState: newAstsState,
						},
					};
					console.log(`updatedTrnObject`, updatedTrnObject);
					astDataClone[astCat][astCatIndex] = updatedTrnObject;
					console.log(`astDataClone`, astDataClone);
				}
			});
		console.log(`astDataClone`, astDataClone);
	}
	return astDataClone;
};

const updateErf = (trn, astsInTrn) => {
	// get id of the erf attached to the trn
	const erfId = trn.erfData.id;
	// console.log(`erfId`, erfId);
	// console.log(`trn`, trn);
	// console.log(`astInTrn`, astsInTrn);

	// use erfId to get reference to the erf document that the ast is attached to
	const erfDocRef = admin.firestore().collection("erfs").doc(erfId);

	// with ref to the erf doc, now update the erfData.metaData.asts
	erfDocRef
		.update({
			"metaData.updatedAtDatetime": Timestamp.now(),
			"metaData.updatedByUser": "admin",
			asts: admin.firestore.FieldValue.arrayUnion(...astsInTrn),
		})
		.then(result => {
			console.log(`result of updatedErfDocWithAstsData `, result);
			return `result of updatedErfDocWithAstsData: ${result}`;
		});

	// with ref to the erf doc, now update the erfData.metaData.trns
	erfDocRef
		.update({
			"metaData.updatedAtDatetime": Timestamp.now(),
			"metaData.updatedByUser": "admin",
			trns: admin.firestore.FieldValue.arrayUnion(trn),
		})
		.then(result => {
			console.log(`result of updatedErfDocWithTrnData `, result);
			return `result of updatedErfDocWithTrnData: ${result}`;
		});
};

// This cloud function will do the following :
// 1. update the trn state to a new 'submited' trn when an exsting trn arrives at firestore with a 'valid' state.
// 2. transition the assosciated ast state from 'checked out' state to 'field' state.
exports.updateTrnAndAstOnTrnValid = functions.firestore
	.document("trns/{trnsId}")
	.onUpdate((change, context) => {
		// console.log(`context`, context)

		// trn data from the chenge parameter
		// const trn = change.after.data();
		const trnAfter = change.after.data();
		// Retrieve the current, previous states and trnType
		const currentTrnState = trnAfter.metaData.trnState;
		console.log(`currentTrnState`, currentTrnState);
		const previousTrnState = trnAfter.metaData.trnState;
		console.log(`previousTrnState`, previousTrnState);
		const trnType = change.after.data().metaData.trnType;
		// console.log(`trnType`, trnType);

		// get erfData from trnAfter
		const { erfData } = trnAfter;

		// get id of the trn doc
		const trnId = trnAfter.id;

		// 3. Update all the ttrnAfterrn asts that are on 'field' state. This will be done by iterating though each of the ids (trnAfter.astData[astCat][index].astData.id).
		const astsInTrn = getAstsInTrn(trnAfter);
		console.log(`astsInTrn`, astsInTrn);
		// All asts in astInTrn are confirmations.conformTrn 'done'. Others are filtered out.

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "installation"
		) {
			console.log(`trns update happened : ${trnType}`);
			// TODO: update to include installation trnType as as a condition
			// trnAfter has transitioned state
			// 1. Send notifications to all who should receive notificatons on the state transition of trnAfter

			// 2. update all asts in trn to the the field state
			const updatedAstData = updateAstsInTrn(trnAfter, "field");
			console.log(`updatedAstData`, updatedAstData);

			// 2. Update trn to the 'submited' state.
			const trnDocRef = db.collection("trns").doc(trnId);
			trnDocRef
				.update({
					"metaData.trnState": "submited",
					"metaData.updatedAtDatetime": Timestamp.now(),
					"metaData.updatedByUser": "admin",
					"astData": updatedAstData,
				})
				.then(updatedTrnDoc => {
					// console.log(`updatedTrnDoc`, updatedTrnDoc);
					return updatedTrnDoc;
				});

			// create a new trn commissioning object
			let newTrnCom = {
				metaData: {
					// createdAtDatetime: db.Timestamp.fromDate(new Date()),
					createdAtDatetime: Timestamp.now(),
					createdByUser: "admin",
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: "admin",
					trnHistory: 0, // how many times transaction has been updated
					trnType: "commissioning",
					trnNo: "",
					trnState: "draft",
				},
				// erfData: trnAfter.erfData,
				erfData,
			};
			// console.log(`1 - newTrnCom`, newTrnCom);

			updateErf(trnAfter, astsInTrn);

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);

					const isDone = ast.trnObject.trnData.confirmations.confirmTrn;
					// console.log(`Installation  -  ast isDone?`, isDone);

					if (isDone === "done") {
						// get reference to the ast to update te state
						const astDocRef = db.collection("asts").doc(ast.astId);

						// get existing trn metaData trnCount array
						let trnCountArray = [];
						if (trnAfter.metaData.trnCount) {
							trnCountArray = trnAfter.metaData.trnCount;
						}

						// update the ast state
						astDocRef
							.update({
								"astData.astState": "field",
								"metaData.updatedAtDatetime": Timestamp.now(),
								"metaData.updatedByUser": "admin",
								"metaData.trnCount": [...trnCountArray, trnAfter],
								// erfData: trnAfter.erfData,
								erfData,
							})
							.then(updatedAstDoc => {
								console.log(`updatedAstDoc`, updatedAstDoc);
								return updatedAstDoc;
							});

						// create a new comssiosioning trn

						// update ast from 'check out' to 'field'.
						// const updatedAst = {
						// 	...ast.trnObject.astData,
						// 	astState: "field",
						// };
						// console.log(`updatedAst`, updatedAst);

						// build new commissioning object
						const newComObj = {
							id: ast.astId,
							astData: {
								...ast.trnObject.astData,
								astState: "field",
							},
							[`${ast.astCat}Installation`]: ast.trnObject.trnData,
							trnData: trnComObj.getTrnComSection(ast.astCat),
						};
						// console.log(`newComObj`, newComObj);

						if (!newTrnCom.astData) {
							newTrnCom.astData = {};
						}

						// console.log(`2 - newTrnCom`, newTrnCom);

						if (!newTrnCom.astData[ast.astCat]) {
							newTrnCom.astData[ast.astCat] = [];
						}
						// console.log(`3 - newTrnCom`, newTrnCom);

						newTrnCom["astData"][ast.astCat][ast.astIndex] = newComObj;
						// console.log(`4 - newTrnCom`, newTrnCom);
					} else {
						// get reference to the ast to update te state
						const astDocRef = db.collection("asts").doc(ast.astId);

						// update the ast state
						astDocRef
							.update({
								"astData.astState": "stores",
								"metaData.updatedAtDatetime": Timestamp.now(),
								"metaData.updatedByUser": "admin",
							})
							.then(updatedAstDoc => {
								// console.log(`updatedAstDoc`, updatedAstDoc);
								return updatedAstDoc;
							});
					}
				});

			// add the newTrnCommissioning document to trns
			return db
				.collection("trns")
				.add(newTrnCom)
				.then(docRef => {
					console.log("Document added with ID: ", docRef.id);
					return `Document added with ID: ${docRef.id}`;
				})
				.catch(error => {
					console.log("Error adding document: ", error.msg);
					return `Error adding document:  ${error.msg}`;
				});
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "commissioning"
		) {
			console.log(`trns update happened : ${trnType}`);
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// 2. Update trn to the 'submited' state.
			const trnDocRef = db.collection("trns").doc(trnId);
			trnDocRef
				.update({
					"metaData.trnState": "submited",
					"metaData.updatedAtDatetime": Timestamp.now(),
					"metaData.updatedByUser": "admin",
					astData: updateAstsInTrn(trnAfter, "field"),
				})
				.then(updatedTrnDoc => {
					// console.log(`updated doc ${updatedTrnDoc}`);
					return updatedTrnDoc;
				});
			// console.log(`updatedDoc`, updatedDoc);

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			return (
				astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);

					// get reference to the ast to update te state
					const astDocRef = db.collection("asts").doc(ast.astId);

					// update the ast state
					astDocRef
						.update({
							"astData.astState": "service",
							"metaData.updatedAtDatetime": Timestamp.now(),
							"metaData.updatedByUser": "admin",
						})
						.then(updatedAstDoc => {
							console.log(`updatedAstDoc`, updatedAstDoc);
							return updatedAstDoc;
						});
				})
			);
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "audit"
		) {
			console.log(`trns update happened : ${trnType}`);
			// TODO: update to include installation trnType as as a condition
			// trn has transitioned state
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// 2. Update trn to the 'submited' state.

			// get id of the trn doc
			// const trnId = change.after.data().id;
			// console.log(`trnId`, trnId);

			// change.after.ref.set({"metaData.trnState": "submited"},{ merge: true })
			// TODO: investigate wht the ref.set method is not working?
			const trnDocRef = db.collection("trns").doc(trnId);
			trnDocRef
				.update({
					"metaData.trnState": "submited",
					"metaData.updatedAtDatetime": Timestamp.now(),
					"metaData.updatedByUser": "admin",
				})
				.then(updatedAstDoc => {
					console.log(`updatedAstDoc`, updatedAstDoc);
					return updatedAstDoc;
				});
			// console.log(`updatedDoc`, updatedDoc);

			// Whenever a new ast is created, two actions must happen:
			// 1. The erf that the ast belongs to must be updated with the astData. This will be done by inserting astData object into erf metaData.asts array property.
			// 2. The audit trn object that created the ast must be nserted into metaData.trns property of the erf.
			updateErf(trnAfter, astsInTrn);

			// iterate through astsInTrn, create new asts and update each to a 'field' state.

			astsInTrn &&
				astsInTrn.forEach(ast => {
					/* 
						ast = {
							astId: trnObject.id,
							astCat: astCat,
							astIndex: astCatIndex,
							trnObject,
						};
					*/
					// console.log(`ast`, ast);
					// console.log(`ast.trnObject`, ast.trnObject);
					// console.log(`ast.trnObject.trnData`, ast.trnObject.trnData);
					// console.log(
					// 	`ast.trnObject.trnData.confirmations`,
					// 	ast.trnObject.trnData.confirmations
					// );
					// console.log(
					// 	`ast.trnObject.trnData.confirmations.confirmTrn`,
					// 	ast.trnObject.trnData.confirmations.confirmTrn
					// );

					// extract conformations.confirm. This detemines if the ast participated or not in the transaction. If the confirm is 'not done', no new ast must be created.
					const isDone = ast.trnObject.trnData.confirmations.confirmTrn;
					// console.log(`Audit  -  ast isDone?`, isDone);

					if (isDone === "done") {
						// get the total count of the exisitng astCat documents. THis is the nused to dermine astNo where astCat is not 'meter'
						// getTotalRecordsInCollection("asts", ast.astCat).then(astCount => {
						// console.log(`${ast.astCat}: ${astCount} - in "asts" `);
						// });

						// get the ast from ast
						const { astData } = ast.trnObject;
						// console.log(`astData`, astData);

						// create a new ast object
						const newAst = {
							metaData: {
								// createdAtDatetime: db.Timestamp.fromDate(new Date()),
								createdAtDatetime: Timestamp.now(),
								createdByUser: "admin",
								updatedAtDatetime: Timestamp.now(),
								updatedByUser: "admin",
								createdThrough: {
									creator: "audit",
									creatorNo: trnAfter.metaData.trnNo,
									id: trnAfter.id,
								},
								trnCount: [trnAfter],
							},
							astData,
							erfData,
						};
						console.log(`newAst`, newAst);

						// add the new ast to the asts collection
						const astsRef = db.collection("asts");
						astsRef
							.add(newAst)
							.then(docRef => {
								console.log("Document added with ID: ", docRef.id);
								return `Document added with ID: ${docRef.id}`;
							})
							.catch(error => {
								console.error("Error adding document: ", error.msg);
								return "Error adding document: ", error.msg;
							});
					}
				});

			// create a service connection (scn)

			// step 0: check if scn already exist. This is done by looiing into scns and asts if the meter in the current installation alrady exist in iREPS. If  it exists, then there is a scn already. If it doesny, there is not scn on that erf, s ogo ahead and create one.
			// const scnExist = checkIfScnExist(astsInTrn);
			const scnExist = false;

			if (scnExist) {
				// update scn
			} else {
				// create a NEW service connection

				console.log(`create a NEW SCN: astsInTrn`, astsInTrn);
				const astsZeTrn = astsInTrn.map(ast => ({
					...ast.trnObject.astData,
					id: ast.trnObject.id,
				}));
				console.log(`astsZeTrn`, astsZeTrn);

				// extract erfIno
				// console.log(`trn`, trn);
				const { address, erfNo, gps } = trnAfter.erfData;
				// console.log(`address`, address);
				// console.log(`erfNo`, erfNo);
				// console.log(`erfNo`, erfNo);

				// step 1: create a NEW scn object
				const newScn = {
					metaData: {
						// createdAtDatetime: db.Timestamp.fromDate(new Date()),
						createdAtDatetime: Timestamp.now(),
						createdByUser: "admin",
						createdByTrn: { trn: { id: trnAfter.id, ...trnAfter.metaData } },
						updatedAtDatetime: Timestamp.now(),
						updatedByUser: "admin",
						updatedByTrn: "",
					},
					handOverPoint: "",
					trnasformerNo: "",
					feederName: "",
					ascAsts: astsZeTrn,
					erfData: { address: address, erfNo: erfNo, gps: gps },
				};
				console.log(`newScn`, newScn);

				// step 2: add the new scn to the scns collection
				const astsRef = db.collection("scns");
				astsRef
					.add(newScn)
					.then(docRef => {
						console.log(`New scn with dic id [${docRef.id}]  created`);
						return `New scn with dic id [${docRef.id}]  created`;
					})
					.catch(error => {
						console.error("Error creating new scn: ", error.msg);
						return "Error creating new scn: ", error.msg;
					});
			}
		}
		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "inspection"
		) {
			console.log(`trns update happened : ${trnType}`);
		}
		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "disconnection"
		) {
			console.log(`trns update happened : ${trnType}`);
		}
		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "reconnection"
		) {
			console.log(`trns update happened : ${trnType}`);
		}
		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "vendong"
		) {
			console.log(`trns update happened : ${trnType}`);
		}
		return "update done succesfully";
	});
