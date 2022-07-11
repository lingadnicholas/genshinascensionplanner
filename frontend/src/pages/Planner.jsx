import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

// SEE Dashboard.jsx 
function Planner() {
  return (
    <>
      <section className='heading'>
        <h1>Welcome</h1>
        <p>Planner</p>
      </section>
    </>
  )
}

export default Planner
