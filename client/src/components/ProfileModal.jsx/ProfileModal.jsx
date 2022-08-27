import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../Actions/uploadAction";
import { userUpdates } from "../../Actions/userUpdates";

function ProfileModal({ modalOpened, setModalOpened,data }) {
  const theme = useMantineTheme();
  const {password,...other}=data;
  const [formdata,setFormdata]=useState(other);
  const [profileImage,setProfileImage]=useState(null);
  const [coverImage,setCoverImage]=useState(null);
  const param=useParams();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.authReducer.authData);

  const handleChage=(e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value});
  }
  const handleImageChange=(event)=>{
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImage(img);
    }
  }
  const handleUpdate=(e)=>{
    e.preventDefault();
    let UserData=formdata;
    if(profileImage){
      const data=new FormData;
      const filename=Date.now()+profileImage.name;
      data.append("name",filename);
      data.append("file",profileImage);
      UserData.profilePicture=filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage){
      const data=new FormData;
      const filename=Date.now()+coverImage.name;
      data.append("name",filename);
      data.append("file",coverImage);
      UserData.profilePicture=filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(userUpdates(param.id,UserData));
    setModalOpened(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleUpdate}>
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChage}
            value={formdata.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChage}
            value={formdata.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="workat"
            placeholder="Works at"
            onChange={handleChage}
            value={formdata.workat}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            onChange={handleChage}
            value={formdata.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChage}
            value={formdata.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChage}
            value={formdata.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImage'onChange={handleImageChange}/>
            Cover Image
            <input type="file" name="coverImage" onChange={handleImageChange}/>
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
