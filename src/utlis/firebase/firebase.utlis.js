import { initializeApp } from 'firebase/app';
import { getAuth, 
    signinWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore, 
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZ4Kv_NfnM1SZgf93hNaX_CP0sBRDXDJg",
    authDomain: "crwn-clothing-db-bab91.firebaseapp.com",
    projectId: "crwn-clothing-db-bab91",
    storageBucket: "crwn-clothing-db-bab91.firebasestorage.app",
    messagingSenderId: "112066694351",
    appId: "1:112066694351:web:291e13f9d16dbc35a9bbba"
  };
  
  const firebaseapp= initializeApp(firebaseConfig);
  
  const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    });
    export const createUserProfileDocument = async (userAuth,additionalInformation) => {
        if (!userAuth) return;
      
        console.log(userAuth);
      };
    export const auth = getAuth();
    export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
    export const db = getFirestore();

    export const createUserDocumentFromAuth = async (userAuth,additionalInformation) => {
        const userDocRef =doc(db,'users', userAuth.uid);
        console.log(userDocRef);

        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot);
        console.log(userSnapshot.exists());

        if (!userSnapshot.exists()) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                });
            } catch (error) {
                console.log('error creating the user', error.message);
            }
        }
        return userDocRef;
    }