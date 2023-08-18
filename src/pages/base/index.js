import { useEffect } from "react";
import { useNavigate } from "react-router";

const Base = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated')
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [])

  return (<div>test</div>)
}

export default Base;