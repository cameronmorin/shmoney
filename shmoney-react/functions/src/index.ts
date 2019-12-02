// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as algoliasearch from 'algoliasearch';

// const ALGOLIA_INDEX_NAME = 'users_search';

// admin.initializeApp();
// const env = functions.config();

// //Init the Algolia Client
// const algolia = algoliasearch(env.algolia.appid, env.algolia.apikey);
// const index = algolia.initIndex(ALGOLIA_INDEX_NAME);

// exports.indexUser = functions.firestore
// 	.document('users/{uid}')
// 	.onCreate((snap, context) => {
// 		const data = snap.data();
// 		const objectID = snap.id;

// 		return index.addObject({
// 			objectID,
// 			...data
// 		});
// });

// exports.unindexUser = functions.firestore
// 	.document('users/{uid}')
// 	.onDelete((snap, context) => {
// 		const objectID = snap.id;

// 		//Delete ID from the index
// 		return index.deleteObject(objectID);
// });

// exports.updateUser = functions.firestore
// 	.document('users/{uid}')
// 	.onUpdate((change, context) => {
// 		const newData = change.after.data();
// 		const objectID = context.params.uid;

// 		return index.partialUpdateObject({
// 			objectID,
// 			...newData
// 		});
// });