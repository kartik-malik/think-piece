import React,{ Component } from "react";
import { auth, firestore ,storage} from "../firebase";
class UserProfile extends Component {
    state={displayName:''}
    imageInput=null;
    handleChange=(e)=>{
        const {name,value}=e.target;
        this.setState({[name]:value});
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const {displayName}=this.state; 
        if(displayName){
            this.userRef.update({displayName});
        }
        if(this.file){
            storage.ref().child('user-profiles').child(this.uid).child(this.file.name).put(this.file).then(
                response=>response.ref.getDownloadURL()
            ).then(photoURL=>this.userRef.update({photoURL}));
        }
    }

    get uid(){
        return auth.currentUser.uid;
    }
    get userRef(){
        return firestore.collection(`users`).doc(this.uid)
    }
    get file(){
        return this.imageInput && this.imageInput.files[0];
    }
    componentDidMount=async()=>{
        auth.onAuthStateChanged(async (userAuth)=>{
            if(userAuth){
                const userData= await firestore.collection(`users`).doc(this.uid).get()
                const {displayName}=userData.data();
                this.setState({displayName})
             }
            })
        
          
        
    }
   
render(){
    const {displayName}=this.state
    return(
         <section className="displayName">
             <form onSubmit={this.handleSubmit} >
                 <input type="text" name="displayName" value={displayName} onChange={this.handleChange} placeholder="display name" />
                 <input type="file" ref={ref=>this.imageInput=ref}/>
                 <input className="update" type="submit"></input>
             </form>
         </section>
    )
}



}
export default UserProfile;