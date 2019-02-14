import React from 'react';

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title : props.name
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                title : 'Aruljothi Parthiban'
            });
        }, 10000)        
    }

    render(){
        return (
            <div>Hello {this.state.title}</div>
        );
    }
};

