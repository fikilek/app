// TODO: migrate all cloud functions to use Firebase 9

const trnComObj = require("./trnComObj");

require("firebase-functions/logger/compat");

const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
// const { getAuth } = require("firebase-admin/auth");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
// const { addDoc, collection } = require("firebase/firestore");
admin.initializeApp();
const db = getFirestore();

const getTotalRecordsInCollection = async (col, astCat) => {
	const collectionRef = admin.firestore().collection(col);
	const query = collectionRef.where("astData.astCartegory", "==", astCat);
	const snapshot = await query.count().get();
	const collectionCount = snapshot.data().count;
	return collectionCount;
};

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

const getAstIdsInTrn = trn => {
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

				// create ast tracking info
				const astTrackingInfo = {
					astId: trnObject.id,
					astCat: astCat,
					astIndex: astCatIndex,
					trnObject,
				};
				astIdsInTrnArray.push(astTrackingInfo);
			});
	}
	return astIdsInTrnArray;
};

// This cloud function will do the following :
// 1. update the trn state to a new 'submited' trn when an exsting trn arrives at firestore with a 'valid' state.
// 2. transition the assosciated ast state from 'checked out' state to 'field' state.
exports.updateTrnAndAstOnTrnValid = functions.firestore
	.document("trns/{trnsId}")
	.onUpdate((change, context) => {
		// console.log(`context`, context)

		// trn data from the chenge parameter
		const trn = change.after.data();
		// Retrieve the current, previous states and trnType
		const currentTrnState = change.after.data().metaData.trnState;
		console.log(`currentTrnState`, currentTrnState);
		const previousTrnState = change.before.data().metaData.trnState;
		console.log(`previousTrnState`, previousTrnState);
		const trnType = change.after.data().metaData.trnType;
		// console.log(`trnType`, trnType);

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "installation"
		) {
			// TODO: update to include installation trnType as as a condition
			// trn has transitioned state
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// 2. Update trn to the 'submited' state.

			// get id of the trn doc
			const trnId = change.after.data().id;

			// change.after.ref.set({"metaData.trnState": "submited"},{ merge: true })
			// TODO: investigate wht the ref.set method is not working?
			const trnDocRef = db.collection("trns").doc(trnId);
			trnDocRef.update({
				"metaData.trnState": "submited",
				"metaData.updatedAtDatetime": Timestamp.now(),
				"metaData.updatedByUser": "admin",
			});

			// 3. Update all asts that have been 'checked out' and installed to "field" state. This will be done by iterating though each of the ids (trn.astData[astCat][index].astData.id)
			const astIdsArray = getAstIdsInTrn(change.after.data());
			// console.log(`astIdsArray`, astIdsArray);

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
				erfData: trn.erfData,
			};
			// console.log(`1 - newTrnCom`, newTrnCom);

			// iterate through astIdsArray, on each ast id, update ast to a 'field' state.
			astIdsArray &&
				astIdsArray.forEach(ast => {
					// console.log(`ast`, ast);

					const isDone = ast.trnObject.trnData.confirmations.confirmTrn;
					console.log(`isDone`, isDone);

					if (isDone === "done") {
						// get reference to the ast to update te state
						const astDocRef = db.collection("asts").doc(ast.astId);

						// update the ast state
						astDocRef.update({
							"astData.astState": "field",
							"metaData.updatedAtDatetime": Timestamp.now(),
							"metaData.updatedByUser": "admin",
						});

						// create a new comssiosioning trn

						// build new commissioning object
						const newComObj = {
							id: ast.astId,
							astData: ast.trnObject.astData,
							[`${ast.astCat}Installation`]: ast.trnObject.trnData,
							trnData: trnComObj.getTrnComSection(ast.astCat),
						};
						console.log(`newComObj`, newComObj);

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
						astDocRef.update({
							"astData.astState": "stores",
							"metaData.updatedAtDatetime": Timestamp.now(),
							"metaData.updatedByUser": "admin",
						});
					}
				});

			// add the newTrnCommissioning document to trns
			db
				.collection("trns")
				.add(newTrnCom)
				.then(docRef => {
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(error => {
					console.log("Error adding document: ", error.msg);
				});
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "commissioning"
		) {
			// TODO: update to include installation trnType as as a condition
			// trn has transitioned state
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// 2. Update trn to the 'submited' state.

			// get id of the trn doc
			const trnIdb = change.before.data().id;
			// console.log(`trnId before`, trnIdb);
			const trnId = change.after.data().id;
			// console.log(`trnId after`, trnId);

			// change.after.ref.set({"metaData.trnState": "submited"},{ merge: true })
			// TODO: investigate wht the ref.set method is not working?
			const trnDocRef = db.collection("trns").doc(trnId);
			const updatedDoc = trnDocRef.update({
				"metaData.trnState": "submited",
				"metaData.updatedAtDatetime": Timestamp.now(),
				"metaData.updatedByUser": "admin",
			});
			// console.log(`updatedDoc`, updatedDoc);

			// 3. Update all asts that have been 'checked out' and installed to "field" state. This will be done by iterating though each of the ids (trn.astData[astCat][index].astData.id)
			const astIdsArray = getAstIdsInTrn(change.after.data());
			// console.log(`astIdsArray`, astIdsArray);

			// iterate through astIdsArray, on each ast id, update ast to a 'field' state.
			astIdsArray &&
				astIdsArray.forEach(ast => {
					// console.log(`ast`, ast);

					// get reference to the ast to update te state
					const astDocRef = db.collection("asts").doc(ast.astId);

					// update the ast state
					astDocRef.update({
						"astData.astState": "service",
						"metaData.updatedAtDatetime": Timestamp.now(),
						"metaData.updatedByUser": "admin",
					});
				});
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "audit"
		) {
			// TODO: update to include installation trnType as as a condition
			// trn has transitioned state
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// 2. Update trn to the 'submited' state.

			// get id of the trn doc
			const trnId = change.after.data().id;
			console.log(`trnId`, trnId);

			// change.after.ref.set({"metaData.trnState": "submited"},{ merge: true })
			// TODO: investigate wht the ref.set method is not working?
			const trnDocRef = db.collection("trns").doc(trnId);
			const updatedDoc = trnDocRef.update({
				"metaData.trnState": "submited",
				"metaData.updatedAtDatetime": Timestamp.now(),
				"metaData.updatedByUser": "admin",
			});
			// console.log(`updatedDoc`, updatedDoc);

			// 3. Update all the trn asts that are on 'field' state. This will be done by iterating though each of the ids (trn.astData[astCat][index].astData.id)
			const astIdsArray = getAstIdsInTrn(change.after.data());
			console.log(`astIdsArray`, astIdsArray);

			// iterate through astIdsArray, create new asts and update each to a 'field' state.

			astIdsArray &&
				astIdsArray.forEach(ast => {
					/* 
						ast = {
							astId: trnObject.id,
							astCat: astCat,
							astIndex: astCatIndex,
							trnObject,
						};
					*/
					console.log(`ast`, ast);
					console.log(`ast.trnObject`, ast.trnObject);
					console.log(`ast.trnObject.trnData`, ast.trnObject.trnData);
					console.log(
						`ast.trnObject.trnData.confirmations`,
						ast.trnObject.trnData.confirmations
					);
					console.log(
						`ast.trnObject.trnData.confirmations.confirmTrn`,
						ast.trnObject.trnData.confirmations.confirmTrn
					);

					// extract conformations.confirm. This detemines if the ast participated or not in the transaction. If the confirm is 'not done', no new ast must be created.
					const isDone = ast.trnObject.trnData.confirmations.confirmTrn;
					console.log(`isDone`, isDone);

					if (isDone === "done") {
						// get the total count of the exisitng astCat documents. THis is the nused to dermine astNo where astCat is not 'meter'
						getTotalRecordsInCollection("asts", ast.astCat).then(astCount => {
							console.log(`${ast.astCat}: ${astCount} - in "asts" `);
						});

						// get the ast from ast
						const { astData } = ast.trnObject;
						console.log(`astData`, astData);

						// get erfData from trn
						const { erfData } = trn;

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
									creatorNo: trn.metaData.trnNo,
									id: trn.id,
								},
								trnCount: [change.after.data()],
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
							})
							.catch(error => {
								console.error("Error adding document: ", error.msg);
							});
					}
				});
		}

	});

// This cloud finction will fetch ast document for a given id then update it with the new state
// exports.updateAstState = functions.https.onCall((data, context) => {
// 	console.log(`data`, data);
// 	console.log(`context`, context);

// 	// get ast id
// 	const astId = data.astId;
// 	console.log(`astId`, astId);

// 	// get new state
// 	const newState = data.newState;

// 	// update ast state
// 	const docRef = db.collection("asts").doc(astId);
// 	const updatedDoc = docRef.update({ "astData.astState": newState });
// 	console.log(`updatedDoc`, updatedDoc);

// 	return updatedDoc;
// });
