import React from 'react';

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name : 'Aruljothi !'
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                name : 'Aruljothi Parthiban !'
            });
        }, 3000)        
    }

    render(){
        return (
            <div>Hello {this.state.name}</div>
        );
    }
};

