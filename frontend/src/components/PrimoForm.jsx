import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import PrimoDisplay from './PrimoDisplay'
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

    const [primoData, setPrimoData] = useState({
        isSubmitted: false, 
        finalPrimos: 0, 
        finalPulls: 0,
        finalDate: '',
        type: ''
    })

    const { primogems, pulls, welkin, abyss, endDate, abyssStars } = formData
    const hideForm = hideAbyss.hideAbyss;
    const { isSubmitted, finalPrimos, finalPulls, finalDate, type } = primoData 


    const dispatch = useDispatch()
    
    const onSubmit = (e) => {
        e.preventDefault() 

        // Validate fields 
        if (!primogems || !pulls || !endDate) {
            toast.error("Please fill out all fields")
            return
        }
        setFormData((prevState) => ({
            ...prevState,
            abyssStars: abyssStars ? abyssStars : 0 
          }))
        // Date will be validated in backend 
        // Calculate pulls
        let tempPrimos = 0; 
        const start = new Date(); 
        const [year, month, day] = endDate.split('-');
        const end = new Date(year, month-1, day)     
        const _MS_PER_DAY = 1000 * 60 * 60 * 24
        const diffDays = Math.ceil((end-start)/ (_MS_PER_DAY))
        const multiplier = welkin ? 150 : 60

        // First calculate from doing dailies 
        tempPrimos += (diffDays * multiplier)
        // Then calculate from abyss 
        let numAbyss = abyss ? 0 : 1; // 0 if user already completed this, 1 otherwise
        const getNumAbyss = (start, end) => {
            let startDate = new Date(start);
            startDate.setHours(0,0,0,0)
            const endDate = new Date(end)
            let i = 0
            while (startDate.valueOf() <= endDate.valueOf()) {
                if (startDate.getDate() === 1 || startDate.getDate() === 16) {
                    i++
                }
                startDate.setDate(startDate.getDate() + 1)
            }
            return i 
        }
        numAbyss += getNumAbyss(start, end) 
        let primosFromAbyss = 0; 
        switch(Number(abyssStars)) {
            case 3:
            case 4:
            case 5: 
                primosFromAbyss = 50;
                break; 
            case 6:
            case 7: 
            case 8: 
                primosFromAbyss = 100; 
                break;
            case 9:
            case 10: 
            case 11: 
                primosFromAbyss = 150;
                break; 
            case 12:
            case 13: 
            case 14: 
                primosFromAbyss = 200;
                break; 
            case 15:
            case 16: 
            case 17: 
                primosFromAbyss = 250;
                break; 
                case 18:
                case 19: 
                case 20: 
                    primosFromAbyss = 300;
                    break; 
                case 21:
                case 22: 
                case 23: 
                    primosFromAbyss = 350;
                    break; 
                case 24:
                case 25: 
                case 26: 
                    primosFromAbyss = 400;
                    break; 
                case 27:
                case 28: 
                case 29: 
                    primosFromAbyss = 450;
                    break; 
                case 30:
                case 31: 
                case 32: 
                    primosFromAbyss = 500;
                    break; 
                case 33:
                case 34: 
                case 35: 
                    primosFromAbyss = 550;
                    break; 
                case 36: 
                    primosFromAbyss = 600; 
                    break;
                default: 
                    primosFromAbyss = 0; 
                    break; 
        }
        tempPrimos = tempPrimos + (primosFromAbyss * numAbyss); 
        console.log(tempPrimos)
        const tempDate = new Date(endDate)
        setPrimoData((prevState) => ({
            ...prevState,
            finalPrimos: tempPrimos,
            finalPulls: Math.floor(tempPrimos/160) + pulls,
            finalDate: `${tempDate.getMonth()-1}-${tempDate.getDate()}-${tempDate.getFullYear()}`,
            isSubmitted:true
          }))
        // TODO: Submit 

        // Do not reset fields to allow for easy reuse
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
            setHideAbyss({
                hideAbyss: false 
            })
        } else { 
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
        <div className="container">
            {isSubmitted ? (<PrimoDisplay date={finalDate} primogems = {finalPrimos} pulls={finalPulls}/>) : ("")}
        </div>
    </div>

  )
}

export default PrimoForm