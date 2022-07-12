function PrimoDisplay({date, primogems, pulls}) {
  return (
    <>
        <h3>On {date} you'll have
            <ul>
                <li>{primogems} Primogems</li>
                <li>Equivalent to {pulls} pulls</li>
            </ul>
        </h3>
    </>
  )
}

export default PrimoDisplay