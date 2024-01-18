import { useEffect, useState, createContext  } from "react";
import Router from "./utility/Router";
import Header from "./components/header";
import Footer from "./components/footer";

export const UserContext = createContext(null);

function App() {

  //---------------------------- user details handings ------------------------------
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleUserChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
    };

    window.addEventListener('user-change', handleUserChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('user-change', handleUserChange);
    };
  }, []);
  //----------------------- endof : user details handings------------------







  
  return (
    <>
      <UserContext.Provider value={user} >

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header/>
          <Router/>
        </div>
        <Footer/>
      </div>
      
      </UserContext.Provider>
    </>
  );
}




export default App;