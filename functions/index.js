const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
admin.initializeApp();
const db = getFirestore();

exports.randomNumber = functions.https.onRequest((request, response) => {
	const name = "fikile Kentane";
	// console.log(`name - from console.log`, name);
	// functions.logger.log("name - functions.logger", name);
	response.send(name);
});

exports.createPo = functions.firestore
	.document("pos/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("pos");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ poNo: collectionSize + 1 });
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
	if (type === "invoice" && transactionType === 'add') {
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
	if (type === "pop" && transactionType === "add") {
		updatedDoc = await docRef.update({
			"poData.poPop": admin.firestore.FieldValue.arrayUnion(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "pop" && transactionType === "remove") {
		updatedDoc = await docRef.update({
			"poData.poPop": admin.firestore.FieldValue.arrayRemove(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	return updatedDoc;
});
