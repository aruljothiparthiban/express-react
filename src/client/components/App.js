import React from 'react';
import axios from 'axios';
import moment from 'moment';

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items : props.items || [],
            isLoading : props.isLoading ===undefined || true
        };
    }

    componentDidMount(){
        axios.get('/data/campaign.json')
        .then((response)=> {
            let { items } = response.data;
            this.setState({
                items,
                isLoading : false
            });
        })
        .catch((error)=> {
            this.setState({
                isLoading : false
            });
        });
    }

    render(){
        let { items, isLoading } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Campaigns</h2>
                        <br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Program</th>
                                    <th>Code</th>
                                    <th>Title</th>
                                    <th>Channel</th>
                                    <th>State Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(p=>{
                                    return (
                                        <tr key={p._id}>
                                            <td>{p.status}</td>
                                            <td>{p.programName}</td>
                                            <td>{p.directMailCampaignCode}</td>
                                            <td>{p.title}</td>
                                            <td>{p.channel}</td>
                                            <td>{moment(p.campaignStartDate).format('DD/MM/YYYY')}</td>
                                            <td>{moment(p.campaignEndDate).format('DD/MM/YYYY')}</td>
                                        </tr>
                                    );
                                })}
                                {items.length===0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">{isLoading?'Loading ...':'No items found!'}</td>
                                    </tr>
                                )}                        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

