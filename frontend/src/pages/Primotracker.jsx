import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PrimoForm from "../components/PrimoForm"


function Primotracker() {
  const { user } = useSelector((state) => state.auth)
  const loggedIn = false
  useEffect( () => {
    if (user) {
      loggedIn = true
    }
  }, [user])

  return (
    <>
      <PrimoForm />

      {loggedIn ? "Log in to track primogems" : "Track primogems"}
    </>
  )
}

export default Primotracker