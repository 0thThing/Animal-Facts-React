import React from 'react'
import Toast from 'react-bootstrap/Toast'

function Facts(props) {
    let factsDivs
    Toast.positionClass = 'toast-top-center'

    factsDivs = props.facts.map((obj) => {
        console.log('is this if working the way it should?',obj.facts !== [],'the facts', obj.facts)
        if(obj.facts.length !== 0){



            console.log('here is the object that should have fact and animal', obj)

            let divContent = obj.facts.map(fact => {
                return(<Toast style={{maxWidth: '75%', marginLeft:'12.5%'}} show={true}><Toast.Body>{fact.text}</Toast.Body></Toast>)

            })
            console.log('the div content is', divContent)
            return <div className={obj.animal} ><div className='inner-box'>{divContent}</div></div>//these nested divs are important to have the scroll bar not overflowing the div

        }

    })
    return(


        <div className='bg'>
            {factsDivs}
        </div>
    )
}
export default Facts