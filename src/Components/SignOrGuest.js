import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";

export default function SignOrGuest() {
  let navigate = useNavigate();

  const { isLogin } = useContext(Context);

  useEffect(()=>{
    if (isLogin) {navigate('/category')};
  },[])


  return (
    <>
      {!isLogin && (
        <>
            <Link to="/Login">
              <button className="button">Sign In</button>
            </Link>
            <Link to="/category">
              <button className="button">Play as Guest</button>
            </Link>
          </>
      )}
    </>
  )
}
