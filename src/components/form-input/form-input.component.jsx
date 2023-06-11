import './form-input.styles.scss';
const FormInput =({lable,...otherProperties})=>{
  return(
    <div className="group ">
      <input className="form-input"{...otherProperties}/>
        { lable && (<label className={`${otherProperties.value.length ?'shrink':''} 
        form-input-label` }>{lable}</label>)}
    
     </div>
  );

}
export default FormInput