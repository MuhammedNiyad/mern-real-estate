import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFromData] = useState({}); //This state is for tracking what type in input field.
  const [error, setError] = useState(null); //This is for show the error..!
  const [loaidng, setLoading] = useState(false); //This state for loading..!
  const navigate = useNavigate();
  // HandleChange is tracking function..!
  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };
  // console.log(formData);

// The handleSubmit function for submit the form..!
  const handleSubmit = async (e) => {
    e.preventDefault(); //This is using for avoid refresh when after clicking submit button..!
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username'  className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="email" placeholder='email'  className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password'  className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loaidng} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loaidng? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sing in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
