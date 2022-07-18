import { useDispatch } from 'react-redux'
import { deletePrimo } from '../features/primos/primoSlice'

function PrimoTrack({primo}) {
    const dispatch=useDispatch()
  return (
    <div className="primoTrack">
        <ul>
            <li>
                {primo.date ? primo.date : "No date"}
            </li>
            <li>
                {primo.pulls}
            </li>
            <li>
                {primo.type}
            </li>
        </ul>
        <button onClick={() => dispatch(deletePrimo(primo._id))} className='delete'>X</button>
    </div>
  )
}

export default PrimoTrack
