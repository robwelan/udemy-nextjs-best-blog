import { firestore } from './db';

const fetchCollectionDocs = async ({ collection }) => {
  const data = [];

  await firestore
    .collection(collection)
    .orderBy('createdAt', 'desc')
    .get()
    .then(documentSet => {
      if (documentSet !== null) {
        documentSet.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      }
    });

  return { data };
};

const fetchDocumentFromCollection = async ({ collection, id }) => {
  let result = {};

  await firestore
    .collection(collection)
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        result = {
          id: doc.id,
          ...doc.data(),
        };
      }
    });

  return result;
};

const fetchDocumentFromCollectionByFieldName = async ({
  collection,
  field,
  value,
}) => {
  let result = {};

  await firestore
    .collection(collection)
    .where(field, '==', value)
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length === 1) {
        const doc = snapshot.docs[0];
        if (doc.exists) {
          result = {
            id: doc.id,
            ...doc.data(),
          };
        }
      }
    });

  return result;
};

const isEmpty = obj =>
  obj && obj.constructor === Object && Object.keys(obj).length === 0;

export {
  fetchCollectionDocs,
  fetchDocumentFromCollection,
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
};
