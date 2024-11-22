import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection,writeBatch,query,getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGXbG0PObwnw81oVknCJovy1aVOIJJW-o",
  authDomain: "c-da208.firebaseapp.com",
  projectId: "c-da208",
  storageBucket: "c-da208.firebasestorage.app",
  messagingSenderId: "846616728772",
  appId: "1:846616728772:web:9382778a465ab46f6f6591"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  const { email } = userAuth;
  const createdAt = new Date();

  try {
    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation
      });
    } else {
      await updateDoc(userDocRef, {
        email,
        ...additionalInformation
      });
    }
  } catch (error) {
    console.log('Error in creating or updating user document:', error.message);
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const addCollectionandDocuments = async(collectionId , objectstoadd) => {

  const collectionRef = collection(db , collectionId)
  const batch = writeBatch(db)

  objectstoadd.forEach((object)=> {

    const docRef = doc(collectionRef , object.name)
    batch.set(docRef , object)


  })

  await batch.commit()
}

export const fetchCollectionandDocuments= async()=>{
  const collectionRef = collection(db, 'staff')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q);
  const staffmap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {name,  ...items}= docSnapshot.data()
    acc [name] = items
    return acc
  }, {})
  return staffmap
  }