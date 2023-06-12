import { useEffect, useState } from "react";
import { singInAuthUserWithEmailAndPassword ,createUserDocumentFromAuth,signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import'./sign-in-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields={
    
    email:'',
    password:'',
    
}
const SignInForm=()=>{
    const[formFields,setFormFields]=useState(defaultFormFields);
    const { email,password}=formFields;
    
    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }
    const googleSignIn= async ()=>{
        const response= await signInWithGooglePopup();
     await createUserDocumentFromAuth(response.user);
    }

    const handleSubmit=async (event)=>{
        event.preventDefault();

       
        try{
           const response=await singInAuthUserWithEmailAndPassword(email,password)
           console.log(response);
            resetFormFields();

        }catch(error){
            console.log(error);
            switch(error.code){
                case "auth/wrong-password": alert("Incorrect password for email");
                break;
                case "auth/user-not-found":alert("No user associated with this email");
                break;
                default: console.log(error);
            }
            
            
        }
    }

    const handleChange=(event)=>{
        const {name,value}=event.target;
         setFormFields({...formFields,[name]:value});
     }
 
    return(
       <div className="sign-up-container">
        <h2> Alread have an account?</h2>
        <span>Sign in with your email and password.</span>
           <form onSubmit={handleSubmit}>
            
            
            
            <FormInput type="email" lable='Email'required onChange={handleChange} name="email" value={email}/>
            
            <FormInput type="password" lable='Password' required onChange={handleChange} name='password' value={password}/>
          
           <div className="buttons-container">
             <Button  type="submit">Sign in</Button>
             <Button type="button" buttonType="google" onClick={googleSignIn}>Google sign in</Button>
         </div>
           </form>
       </div>
    );

}
export default SignInForm;
