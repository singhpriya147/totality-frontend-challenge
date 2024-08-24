import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import './Header.css';
import { AppContext } from '../../context';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../../firebase/firebase';

import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

import { auth } from '../../firebase/firebase';
import { CiBookmark } from 'react-icons/ci';
const Header = () => {
  const { state } = useContext(AppContext);
  const { cart } = state;
  const[userName,setUserName]=useState('user');
  // const{currentUser}=state;
  // const user = auth.currentUser;

   useEffect(() => {
     const fetchUserName = async () => {
       const user = auth.currentUser;
       if (user) {
         try {
           const userDoc = await getDoc(doc(db, 'Users', user.uid));
           if (userDoc.exists()) {
             const userData = userDoc.data();
             setUserName(userData.userName || 'User');
           } else {
             console.log('No such document!');
           }
         } catch (error) {
           console.error('Error fetching user data:', error);
         }
       }
     };

     fetchUserName();
   }, []);

  return (
    <header className='header'>
      <Link to='/home'>
        <div>
          <h2>SUCASA</h2>
        </div>
      </Link>

      <Link to='/cart'>
        <PiShoppingCartSimpleLight style={{ fontSize: 25 }} />
       
        <span className='cart-badge'>{cart.length}</span>
      </Link>

      <Link to='/bookmarks'>
        <CiBookmark  style={{position:'relative', zIndex:99,fontSize:25}}/>
      </Link>
    
      <div>{userName}</div>
    </header>
  );
};

export default Header;
