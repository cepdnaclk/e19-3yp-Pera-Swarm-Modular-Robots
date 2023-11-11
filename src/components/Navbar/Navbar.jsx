import { useEffect } from "react"
import "./Navbar.css";
import useOnScreen from "hooks/useOnScreen";

function Navbar({refs}){
  const links = ["Home", "About", "Contact"];
  const isOnScreen = refs.map((ref)=>useOnScreen(ref));

  // scroll to page on nav item click
  const handleClick = (ref) => {
    ref.current?.scrollIntoView({ behaviour:'smooth'  })
  }

  useEffect(()=>{
    console.log(isOnScreen);
  }, [isOnScreen])

  return( 
    <nav>
      <ul>
        {
          links.map((link, index)=>(
            <li
              className={isOnScreen[index] ? "active" : null}
              key={index}
              onClick={()=>{handleClick(refs[index])}}
            >
              {link} 
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

export default Navbar;

