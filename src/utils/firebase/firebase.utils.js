
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithRedirect,
       signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
  } from 'firebase/auth'

  import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore'  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxpruXitf8nEgrYbFrH__ejBPtdZAmLV8",
  authDomain: "crwn-clothing-db-d6f01.firebaseapp.com",
  projectId: "crwn-clothing-db-d6f01",
  storageBucket: "crwn-clothing-db-d6f01.appspot.com",
  messagingSenderId: "29302486164",
  appId: "1:29302486164:web:735d4771cf979b679c3081"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account",
})
export const auth= getAuth();
export const signInWithGooglePopup=()=> signInWithPopup(auth,provider);

export const db= getFirestore();

export const createUserDocumentFromAuth= async (userAuth,additionalInformation={})=>{
  if(!userAuth) return;
    const userDocRef= doc(db,'users',userAuth.uid);
    const userSnapShot= await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());
   
    if(!userSnapShot.exists()){
      const { displayName,email }=userAuth;
      const createdAt=new Date();

      try{
        await setDoc(userDocRef,{
          displayName,email,createdAt,...additionalInformation,
        });

      }catch(error){
        console.log('error inserting user data ',error.message);
      }
    }
    return userDocRef;

}
export const createAuthUserWithEmailAndPassword= async(email,password)=>{
  
  if(!email || !password) return;

 return await createUserWithEmailAndPassword(auth,email,password);

}