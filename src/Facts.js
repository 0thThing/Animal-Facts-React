import React from 'react'

function Facts(props) {
    let backgroundDivs

    backgroundDivs = props.facts.map((obj) => {
        console.log('is this if working the way it should?',obj.facts !== [],'the facts', obj.facts)
        if(obj.facts.length !== 0){



            console.log('here is the object that should have fact and animal', obj)

            let divContent = obj.facts.map(fact => <p>{fact.text}</p>)//using index only works because the types of facts are in the same order
            console.log('the div content is', divContent)
            return <div className={obj.animal} ><div className='inner-box'>{divContent}</div></div>

        }

    })
    return(


        <div className='bg'>
            {backgroundDivs}
        </div>
    )
}
export default Facts