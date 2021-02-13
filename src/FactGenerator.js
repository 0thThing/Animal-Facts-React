import React from 'react'
import Button from 'react-bootstrap/Button'
import Facts from './Facts'


//note: this backend API that the facts come from do not distribute the facts evenly
// so even though you request dog facts you might not get any if you request another type of animal fact as well
//just noticed I could fix this problem but changing the way get facts works and just distribute the facts evenly
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
                    allFacts: [
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
                if (factType.id == event.target.name) {//this needs == and not === for type conversion
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
        console.log(event.target.value)
        if(event.target.value === '')
        {
            this.setState({
                filteredFacts: this.state.allFacts

            })
        }

        let allFilteredFacts = []

        for (let i=0;i<this.state.allFacts.length;i++){
            //going to loop through and try to filter each animal fact type seperate
            //one thing I dont like here is the order could get messed up if you change the state variables

            let list = this.state.allFacts[i].facts
            console.log('this is the list ',list)
            let filteredFacts = list.filter((fact) => {
                    return fact.text.toLowerCase().includes(event.target.value.toLowerCase())
                }
            )

            allFilteredFacts.push(filteredFacts)
            console.log(allFilteredFacts)
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

                <Facts facts={this.state.filteredFacts}/>



            </div>
        )
    }


}


export default FactGenerator;

