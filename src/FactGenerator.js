import React from 'react'


class FactGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            facts: [],
            filteredFacts: [],
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
        for (let i=0;i< this.state.factTypes.length;i++)
        {
            let fact = this.state.factTypes[i]
            console.log(this.state.factTypes[i].getFact)
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
                let fact_list = [];
                for (let i = 0; i < res.length; i++) {
                    let {text,id} = res[i]
                    fact_list.push({text, id})
                }

                this.setState({ //set them both since we only display filtered facts below
                    facts: fact_list,
                    filteredFacts: fact_list,
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
        let filteredFacts = this.state.facts.filter((fact) => {
                return fact.text.toLowerCase().includes(event.target.value.toLowerCase())
            }
        )

        this.setState({
            filteredFacts: filteredFacts
        })

    }

    render() {
        let facts = this.state.filteredFacts.map(fact => <p key={fact.text}>{fact.text}</p>)  // Note we are using filteredFacts from state here DO NOT THINK WE NEED TO PASS THIS INTO HANDLECHANGE ANYMORE
        return (
            <div className='fact-generator'>
                <input type='text' className='search-bar' placeholder='Search...' onChange={this.handleFilter}></input> <p></p>

                <input type='number' placeholder='1' name='numberOfFacts' value={this.state.numberOfFacts} min={1} max={500} onChange={this.handleChange}></input>
                <label>cat</label>
                <input  type='checkbox' name='1' checked={this.state.factTypes[0].getFact} onChange={(e) => this.handleChange(e,this)}></input>
                <label>dog</label>
                <input  type='checkbox' name='2' checked={this.state.factTypes[1].getFact} onChange={(e) =>this.handleChange(e,this)}></input>
                <label>snail</label>
                <input  type='checkbox' name='3' checked={this.state.factTypes[2].getFact} onChange={(e) => this.handleChange(e,this)}></input>
                <label>horse</label>
                <input  type='checkbox' name='4' checked={this.state.factTypes[3].getFact} onChange={(e) =>this.handleChange(e,this)}></input> <p></p>
                <button onClick={this.getFacts}>Get Facts!</button>

                {facts}
            </div>

        )
    }


}


export default FactGenerator;

