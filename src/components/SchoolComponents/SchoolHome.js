import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import uuid from 'uuid';
import Can from '../../Can';
import auth0Client from '../../Auth';
import axios from 'axios';

class SchoolHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            props: props,
            averageQuestionsRate: '',
            averageRecommendationsRate: '',
            teachersdays: '',
            top1: '',
            top2: '',
            top3: '',
            top1v: '',
            top2v: '',
            top3v: ''

        };
    }
    componentWillMount(){
        console.log("TEACHER HOME IS MOUNTING!!!!!!!!!!!!!!!!!!!")
        axios.get('https://beta.edvotech.com/api/school/home',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            console.log("HOEM REPOSNSE: ", response);
            this.setState({averageQuestionsRate: response.data.averageQuestionsRate});
            this.setState({averageRecommendationsRate: response.data.averageRecommendationsRate});
            this.setState({teachersdays: response.data.teachersdays});
            this.setState({top1: response.data.toptargetsordered[0].target});
            this.setState({top1v: response.data.toptargetsordered[0].value});
            this.setState({top2: response.data.toptargetsordered[1].target});
            this.setState({top2v: response.data.toptargetsordered[1].value});
            this.setState({top3: response.data.toptargetsordered[2].target});
            this.setState({top3v: response.data.toptargetsordered[2].value});
            });
    }
        render(){
            return(
    <Can
        role={auth0Client.getRole()}
        perform="school:home"
        yes={() => (
    <div>
        <h1>Teachers' Days in the platform: {this.state.teachersdays}</h1>
        <h1>Average Recommendation Rate: {this.state.averageRecommendationsRate}</h1>
        <h1>Average Question Rate: {this.state.averageQuestionsRate}</h1>
        <h1>Top Targets: </h1>
        <h2>{this.state.top1}</h2>
        <h2>{this.state.top1v}</h2>
        <h2>{this.state.top2}</h2>
        <h2>{this.state.top2v}</h2>
        <h2>{this.state.top3}</h2>
        <h2>{this.state.top3v}</h2>
    </div>
     )}
     no={() => <Redirect to="/" />}
   />);
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
    };
};
export default connect(mapStateToProps)(SchoolHome);