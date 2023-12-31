import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import Uploader from './Uploader';
import { fetchProfileByUser, updateProfile, startLoading, endLoading } from '../redux/profileSlice.js'
import Input from './input';
import ProfileDetail from './Profile';

const Settings = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const initialState = {
    name: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    contactAddress: '',
    logo: '',
    paymentDetails: ''
  };

  const [form, setForm] = useState(initialState);
  const location = useLocation()
  const dispatch = useDispatch();
  // const { profiles } = useSelector((state) => state.profile);
  // console.log(profiles)
  const [switchEdit, setSwitchEdit] = useState(0)
  const { profiles } = useSelector((state) => state.profiles);


  useEffect(() => {
    if (switchEdit === 1) {
      setForm(profiles)
    }
  }, [switchEdit])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (user?.result?._id) {
  //         dispatch({ type: startLoading });

  //         const token = JSON.parse(localStorage.getItem('token')); // Get the token


  //         const response = await axios.get(`/profile/getProfilesByUser?searchQuery=${user.result._id}`, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'auth-token': token,
  //           },
  //         });

  //         // You can access the response data using response.data
  //         const data = response.data;

  //         dispatch({ type: fetchProfileByUser, payload: data });
  //         dispatch({ type: endLoading });
  //       }
  //     } catch (error) {
  //       console.error(error.response);
  //       // Handle the error as needed
  //     }
  //   };

  //   if (location && switchEdit) {
  //     fetchData();
  //   }
  // }, [location, switchEdit]);
  // // [location, switchEdit, dispatch, user?.result?._id]); 

  // localStorage.setItem('profileDetail', JSON.stringify({ ...profiles }))
  const { _id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token')); // Get the token
    // const profileId = profiles._id;
    try {
      const response = await axios.get(`/profile/updateProfile/${_id}`, form, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const data = response.data;
      dispatch({ type: updateProfile, payload: data });
      setSwitchEdit(0)
    } catch (error) {
      console.error(error);
      // Handle the error here, for example, by displaying an error message to the user.
    }
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const { profileId } = useParams();


  return (
    <div>
      {switchEdit === 0 && (
        <div>
          <ProfileDetail />
          <button style={{ marginLeft: '48px', cursor: 'pointer', padding: '12px 30px' , backgroundColor: 'rgba(255, 207, 153, 1)',}} onClick={() => setSwitchEdit(1)}>Edit Profile</button>
        </div>
      )}

      {switchEdit === 1 && (
        <div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: 'solid 1px #dddddd',
            paddingBottom: '20px'
          }}>
            {/* <img
              alt=""
              src={profiles?.logo}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            /> */}
          </div>
          <form onSubmit={handleSubmit}>
            <Uploader form={form} setForm={setForm} />
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" half value={form?.email} />
            <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" half value={form?.phoneNumber} />
            <Input name="businessName" label="Business Name" handleChange={handleChange} type="text" value={form?.businessName} />
            <Input name="contactAddress" label="Contact Address" handleChange={handleChange} type="text" value={form?.contactAddress} />
            {/* <Input name="paymentDetails" label="Payment Details/Notes" handleChange={handleChange} type="text" multiline rows="4" value={form?.paymentDetails} /> */}
            <button type="submit" style={{
              width: '20%',
              padding: '6px',
              backgroundColor: 'rgba(255, 207, 153, 1)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '24px' ,
              marginTop: '8px' 


              }}>
            Update Settings
          </button>
        </form>
        </div>
  )
}

    </div >

  );
};

export default Settings;
