import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";


export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  // console.log(formData);
  // console.log(fileUploadError);
  // console.log(filePerc);
  // console.log(file);

  /* firebase storage rules..
      allow read, write: if request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*');*/

  useEffect(()=>{
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', async (snapshop) => {
      const progress = (snapshop.bytesTransferred / snapshop.totalBytes) * 100;
      // console.log("Upload is " + progress + '%done');
      await setFilePerc(Math.round(progress));
    }, (error)=> {
         setFileUploadError(true);
    }, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await setFormData({ ...formData, avatar: downloadURL });
    });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="User Profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
        <p className="text-sm self-center">{fileUploadError ? 
        (<span className="text-red-700">Error image upload</span>) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`Uploading ${filePerc}&`}</span>) : filePerc === 100 ? (
            <span className="text-green-700">Successfully uploaded..!</span>) : ("")}</p>
        <input type="text" placeholder="username" id="username" className="border p-3  rounded-lg"/>
        <input type="email" placeholder="email" id="email" className="border p-3  rounded-lg"/>
        <input type="password" placeholder="password" id="password" className="border p-3  rounded-lg"/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-75">Update</button>
      </form>
      <div className="flex justify-between mt-5">
       <span className="text-red-700 cursor-pointer ">Delete Account</span>
       <span className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
    </div>
  )
}
