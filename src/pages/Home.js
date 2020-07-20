import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from 'stores/userStore';

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div>
      Hello {user.name}
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  );
}
