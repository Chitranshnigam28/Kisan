import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu1mNebskATIVQmz59QosBS1AhdMAkxqM",
  authDomain: "art-asta-50475.firebaseapp.com",
  projectId: "art-asta-50475",
  storageBucket: "art-asta-50475.appspot.com",
  messagingSenderId: "343332230219",
  appId: "1:343332230219:web:efe5a85c164e5e461c69ce"
};

// Initialize Firebase with npm package
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', url);
        setDownloadURL(url);
      }
    );
  };
};

export default ImageUpload;
