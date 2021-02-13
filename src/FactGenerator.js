import React from 'react'
import Button from 'react-bootstrap/Button'

//problem is when you click a checkbox the render fuinction runs and there are no filtered facts yet, there has got to tbe a better way
class FactGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            allFacts: [
                {animal: 'cat', facts: []},
                {animal: 'dog', facts: []},
                {animal: 'snail',facts: []},
                {animal: 'horse',facts: []},

            ],
            filteredFacts: [
                {animal: 'cat', facts: []},
                {animal: 'dog', facts: []},
                {animal: 'snail',facts: []},
                {animal: 'horse',facts: []},

            ],
            numberOfFacts: 2,
            factTypes: [
                {animal: 'cat', getFact: false, id: 1},
                {animal: 'dog', getFact: false, id: 2},
                {animal: 'snail', getFact: false, id:3},
                {animal: 'horse', getFact: false, id:4},
            ],



        }

        this.getFacts = this.getFacts.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
    }

    getFacts() {

        let animalTypes = ''
        for (let i=0;i< this.state.factTypes.length;i++)//loop to construct the proper string so the api returns only the animal facts requested
        {
            let fact = this.state.factTypes[i]

            if (fact.getFact)
            {
                console.log(fact.animal)
                animalTypes += fact.animal+','
            }
            console.log(animalTypes)
        }


        fetch('https://cat-fact.herokuapp.com/facts/random?animal_type='+animalTypes+'&amount='+this.state.numberOfFacts)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let dogFactList = [];
                let catFactList = [];
                let snailFactList = [];
                let horseFactList = [];
                let allFacts = [];



                for (let i = 0; i < res.length; i++) {

                    let {text,id,type} = res[i]
                    if(res[i].type === 'cat'){
                        catFactList.push({text,id,type})
                        allFacts.push({text,id,type})
                    }
                    else if(res[i].type === 'dog'){
                        dogFactList.push({text,id,type})
                        allFacts.push({text,id,type})
                    }
                    else if(res[i].type === 'snail'){
                        snailFactList.push({text,id,type})
                        allFacts.push({text,id,type})
                    }
                    else if(res[i].type === 'horse'){
                        horseFactList.push({text,id,type})
                        allFacts.push({text,id,type})
                    }

                }

                this.setState({ //set them both since we only display filtered facts below
                    facts: [
                        {animal: 'cat', facts: catFactList},
                        {animal: 'dog', facts: dogFactList},
                        {animal: 'snail',facts: snailFactList},
                        {animal: 'horse',facts: horseFactList},

                    ],
                    filteredFacts: [
                        {animal: 'cat', facts: catFactList},
                        {animal: 'dog', facts: dogFactList},
                        {animal: 'snail',facts: snailFactList},
                        {animal: 'horse',facts: horseFactList},
                    ]
                })

            })

    }

    handleChange(event, checkbox) {
        console.log(event)
        console.log(checkbox)
        if (event.target.type === 'checkbox') {

            let factTypeList = this.state.factTypes.map(factType => {
                console.log(factType.id)
                console.log(event.target.name)
                if (factType.id == event.target.name) {
                    factType.getFact = !factType.getFact
                }
                return factType
            })
            this.setState({
                factTypes: factTypeList
            })

    }
        else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

    }

    handleFilter(event) {

        let allFilteredFacts = []
        for (let i=0;i<this.state.facts.length;i++){
            //going to loop through and try to filter each animal fact type seperate
            //one thing I dont like here is the order could get messed up if you change the state variables
            let list = this.state.allFacts[i].facts
            let filteredFacts = list.filter((fact) => {

                    return fact.text.toLowerCase().includes(event.target.value.toLowerCase())
                }
            )
            allFilteredFacts.push(filteredFacts)
        }

        this.setState({
            filteredFacts: [

                {animal: 'cat', facts: allFilteredFacts[0]},
                {animal: 'dog', facts: allFilteredFacts[1]},
                {animal: 'snail',facts: allFilteredFacts[2]},
                {animal: 'horse',facts: allFilteredFacts[3]},
            ]
        })

    }

    render() {
        let backgroundDivs
        let count = 0;
        for (let type of this.state.factTypes)
        {

            if(type.getFact){
                count = count +1
                console.log(count)
            }
        }
        let widthPercentage = (1/count)* 100

        let divWidth = widthPercentage+'%'
        let divStyle

        count = 0// this can not be the best way but I have to reset this counter to then calculate the margins for the divs
        backgroundDivs = this.state.filteredFacts.map((obj, index) => {
            console.log('is this if working the way it should?',obj.facts !== [])
            if(obj.facts !== []){

                let divMargin = widthPercentage * count+'%'
                divStyle = {width: divWidth, leftMargin: divMargin}
                console.log('the div style is: ', divStyle)
                count = count +1
                console.log('here is the object that should have fact and animal', obj)

                let divContent = obj.facts.map(fact => <p>{fact.text}</p>)//using index only works because the types of facts are in the same order
                console.log('the div content is', divContent)
                return <div className={obj.animal} style={divStyle}>{divContent}</div>

            }

        })


        return (
            <div className='container-fluid'>
                <div className='buttons'>
                    <input type='text' className='search-bar' placeholder='Search...'
                           onChange={this.handleFilter}></input> <p></p>

                    <input type='number' placeholder='1' name='numberOfFacts' value={this.state.numberOfFacts} min={1}
                           max={500} onChange={this.handleChange}></input>
                    <label>cat</label>
                    <input type='checkbox' name='1' checked={this.state.factTypes[0].getFact}
                           onChange={(e) => this.handleChange(e, this)}></input>
                    <label>dog</label>
                    <input type='checkbox' name='2' checked={this.state.factTypes[1].getFact}
                           onChange={(e) => this.handleChange(e, this)}></input>
                    <label>snail</label>
                    <input type='checkbox' name='3' checked={this.state.factTypes[2].getFact}
                           onChange={(e) => this.handleChange(e, this)}></input>
                    <label>horse</label>
                    <input type='checkbox' name='4' checked={this.state.factTypes[3].getFact}
                           onChange={(e) => this.handleChange(e, this)}></input> <p></p>
                    <Button onClick={this.getFacts}>Get Facts!</Button>

                </div>


                <div className='bg'>
                    {backgroundDivs}
                </div>


            </div>
        )
    }


}


export default FactGenerator;

