import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn=()=>{
    const logGoogleUser= async ()=>{
        const response= await signInWithGooglePopup();
        createUserDocumentFromAuth(response.user);
    }
 
    return(
   <div>

    <h1>Sign in page.</h1>
    <button className='btn' onClick={logGoogleUser}>
        Sign in with Google
    </button>
   </div>

    );
 
}
export default SignIn;