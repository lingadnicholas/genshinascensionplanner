import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
// import trackPrimos from ../features/primos/[file]
function PrimoForm() {
    const [formData, setFormData] = useState({
        primogems: '', 
        pulls: '', 
        welkin: false, 
        abyss: false, 
        endDate: '', 
        abyssStars: '', 
      })

    const [hideAbyss, setHideAbyss] = useState({
        hideAbyss: false,
    })


    const { primogems, pulls, welkin, abyss, endDate, abyssStars } = formData
    const hideForm = hideAbyss.hideAbyss;



    const dispatch = useDispatch()
    
    const onSubmit = (e) => {
        e.preventDefault() 

        // Validate fields 
        setFormData((prevState) => ({
            ...prevState,
            primogems: (primogems) ? primogems : 0, 
            pulls: pulls ? pulls : 0, 
            abyssStars: abyssStars ? abyssStars : 0 
          }))
        // Date will be validated in backend 

        // TODO: Submit 

        // Reset fields 
        setFormData((prevState) => ({
            primogems: '', 
            pulls: '', 
            welkin: false, 
            abyss: false, 
            endDate: '', 
            abyssStars: '', 
        }))
    }

    const onChange = (e) => {
        // Validate 
        if (e.target.type === "date") {
            const date = e.target.value + ''; 
            const [year, month, day] = date.split('-');
            const endDate = new Date(year, month-1, day)
            const curDate = new Date()
            if (endDate < curDate) {
                toast.error('End date must be later than today.')
                e.target.value = '';
                return; 
            }
        } else if (e.target.id === "primogems" || e.target.id === "pulls") {
            const num = e.target.value; 
            if (num < 0) {
                e.target.value = 0; 
                toast.error("Primogems and pulls must be at least 0")
            }
        } else if (e.target.id === "abyssStars") {
            const num = e.target.value; 
            const error = "Abyss Stars must be in the range 0-36"
            if (num < 0) {
                e.target.value = 0; 
                toast.error(error); 
            } else if (num > 36) {
                e.target.value = 36; 
                toast.error(error)
            }
        }
        // Set data 
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target[e.target.type === "checkbox" ? "checked" : "value"],
        }))

        if (e.target.type === "date") {
                    // Today's date
        const date = e.target.value; 
        const today = new Date() 
        const todayDate = today.getDate() 
        const todayMonth = today.getMonth() + 1
        const todayYear = today.getFullYear()
        // End date
        // At this point, end date is guaranteed to be later than today 
        const [year, month, day] = date.split('-');
        // There is an abyss reset if it is a new month OR if the date is < 16 and the end date is >= 16
        if (todayMonth < Number(month) || (todayYear < year) || (todayDate < 16 && day >= 16) || !abyss) {
            console.log("Calling set false")
            setHideAbyss({
                hideAbyss: false 
            })
        } else { 
            console.log("calling set")
            setHideAbyss({
                hideAbyss: true 
            })}
        }
      }
  return (
    <div className="container">
        <section className = 'form'>
            <form onSubmit={onSubmit}>
                <div className = 'form-group'>
                    <p>Primogems: </p>
                    <input
                        type='number'
                        className='form-control'
                        id='primogems'
                        name='primogems'
                        value={primogems}
                        placeholder="Current # of Primogems"
                        onChange={onChange} 
                    />
                </div>
                <div className = 'form-group'>
                    <p>Pulls: </p> 
                    <input
                        type='number'
                        className='form-control'
                        id='pulls'
                        name='pulls'
                        value={pulls}
                        placeholder="Current # of Pulls"
                        onChange={onChange} 
                    />
                </div>
                <div className = 'form-group'>
                    <p>Welkin? </p> 
                    <input
                        type='checkbox'
                        className='form-control'
                        id='welkin'
                        name='welkin'
                        checked={welkin}
                        onChange={onChange} 
                    />
                </div>
                <div className = 'form-group'>
                    <p>Abyss completed this moon? </p>
                    <input
                        type='checkbox'
                        className='form-control'
                        id='abyss'
                        name='abyss'
                        value={endDate}
                        onChange={onChange} 
                    />
                </div>
                <div className = 'form-group'>
                    <p>End Date: </p> 
                    <input
                        type='date'
                        className='form-control'
                        id='endDate'
                        name='endDate'
                        checked={abyss}
                        onChange={onChange} 
                    />
                </div>
                <div className ={`form-group ${hideForm ? "hidden" : ""}`}>
                    <p>Expected # of Abyss Stars: </p>
                    <input
                        type='number'
                        className='form-control'
                        id='abyssStars'
                        name='abyssStars'
                        value={abyssStars}
                        placeholder='Expected # of Abyss Stars'
                        onChange={onChange} 
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                    Submit
                    </button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default PrimoForm