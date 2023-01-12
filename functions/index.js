const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
// const { collection } = require("firebase/firestore");
admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.randomNumber = functions.https.onRequest((request, response) => {
	const name = "fikile Kentane";
	console.log(`name - from console.log`, name);
	functions.logger.log("name - functions.logger", name);
	response.send(name);
});

exports.createPo = functions.firestore
	.document("pos/{userId}")
	.onCreate( async (snap, context) => {
		const posRef = admin.firestore().collection("pos");
		await posRef
			.get()
			.then( async querySnapshot => {
				const collectionSize = querySnapshot.size;
        functions.logger.log(`collectionSize:`, collectionSize);
        // TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
        const docRef = snap.ref
        // console.log(`docRef`, docRef)
        const updatedPoDoc = await docRef.update({ poNo: collectionSize + 1 });
        console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});
