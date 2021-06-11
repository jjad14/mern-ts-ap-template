import React, { createContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const myContext = createContext({});

export default function Context(props: any) {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    // withCredentials: true basically says, axios make sure the reciever is aware of the cookies in our browser, so pass the cookies from the browser to the server
    axios
      .get('http://localhost:4000/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, []);
  return (
    <myContext.Provider value={userObject}>
        {props.children}
    </myContext.Provider>
  );
}

// 1:02:13