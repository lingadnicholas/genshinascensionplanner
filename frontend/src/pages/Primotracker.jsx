import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PrimoForm from "../components/PrimoForm"
import PrimoTrack from '../components/PrimoTrack'
import Spinner from '../components/Spinner'
import { getPrimos, reset } from '../features/primos/primoSlice'

function Primotracker() {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { primos, isLoading, isError, message } = useSelector(
    (state) => state.primos
  )
  useEffect( () => {
    if (isError) {
      console.log(message)
    }

    if (user) {
      dispatch(getPrimos())
    } 

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

    if (isLoading) {
      return <Spinner />
    }

  const PrimoDisplay = ({primos}) => {
    return(
    primos.length > 0 ? (
      <div className='primoTrackItems'>
        {
          primos.map((primo) => (
          <PrimoTrack primo={primo}/>
        ))}
      </div>
    ) : (<p>You have not tracked any primos</p>)
    )
}
  return (
    <>
      <PrimoForm />


      {user ? (
        <>
        <section className="primoTrackHeader">
          <p>Date</p>
          <p>Pulls</p>
          <p>Type</p>
          </section>
        <PrimoDisplay primos={primos}/>
        </>
      ) : "Log in to track primogems"}
    </>
  )
}

export default Primotracker