import { useEffect, useState } from "react"
import {BsSun,BsMoon} from 'react-icons/bs'

export default function ToggleThemeButton() {

  const [theme, setTheme] = useState(localStorage.theme)

  useEffect(()=> {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },[theme])

  const toggleTheme = () => {
    if(theme === 'dark'){
      setTheme('light')
      localStorage.theme = 'light'
    }else{
      setTheme('dark')
      localStorage.theme = 'dark'
    }
  }

  return (
    <div>
      {console.log(theme)}
      <button className='text-3xl' onClick={()=>toggleTheme()}>
        {theme === 'light' ? <BsSun className=""/> : <BsMoon className="text-white"/>}
      </button>
    </div>
  )
}