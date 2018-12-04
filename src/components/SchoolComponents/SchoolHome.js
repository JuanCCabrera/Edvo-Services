import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import uuid from 'uuid';
import Can from '../../Can';
import auth0Client from '../../Auth';
import axios from 'axios';
import { setLoadingModal } from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';

/**
 * School Home page. 
 */
class SchoolHome extends React.Component {
    constructor(props){
        super(props);
        //State contains default properties, average question rating, average recommendations rating, 
        //Top 3 challenge categories and the number of users which have selected the categories listed. 
        this.state = {
            props: props,
            averageQuestionsRate: 0,
            averageRecommendationsRate: 0,
            teachersdays: 0,
            top1: '',
            top2: '',
            top3: '',
            top1v: 0,
            top2v: 0,
            top3v: 0

        };
    }
    
    componentWillMount(){
        //Set loading modal
        this.props.dispatch(setLoadingModal());
        //Get school home page information from database. 
        axios.get('https://beta.edvotech.com/api/school/home',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            //Set elements in local state based on received information
            this.setState({averageQuestionsRate: !response.data.averageQuestionsRate ? 0 : response.data.averageQuestionsRate});
            this.setState({averageRecommendationsRate: !response.data.averageRecommendationsRate ? 0:response.data.averageRecommendationsRate });
            this.setState({teachersdays: !response.data.teachersdays ? 0 : response.data.teachersdays });
            this.setState({top1: response.data.toptargetsordered[0].target});
            this.setState({top1v: response.data.toptargetsordered[0].value});
            this.setState({top2: response.data.toptargetsordered[1].target});
            this.setState({top2v: response.data.toptargetsordered[1].value});
            this.setState({top3: response.data.toptargetsordered[2].target});
            this.setState({top3v: response.data.toptargetsordered[2].value});
            //Clear loading modal
            this.props.dispatch(setLoadingModal());
            }).catch(error => {
                //Clear loading modal
                this.props.dispatch(setLoadingModal());
                //Set failure modal
                this.props.dispatch(setFailureModal());
            });
       
    }
        render(){
            return(
    //Authenticate user information to grant access to School Home page. 
    <Can
        role={auth0Client.getRole()}
        perform="school:home"
        yes={() => (
    <div className="background-home">
            
        <div className="container text-center">
            {
                //Page title
            }
                <h1 className="home__title">
                    {this.props.lang === 'English' ? 'My Dashboard' : 'Mi Tablero'}
                    <hr className="break"/>
                </h1>
        </div>

        <div className="container">
            <div className="row text-center">
                <div className="col-md-4">
                {
                    //Numbers of days teachers have logged into platform
                }
                    <div className="big-card-school-home">
                        {this.props.lang === 'English' ? 'Number of Days that Teachers Logged In' : 'Número de Días que Maestros han Entrado a la Plataforma'} 
                        <p className="big__teacher__home__text">{this.state.teachersdays}</p>
                    </div>
                </div>
                <div className="col-md-4">
                {
                    //Average Recommendations Rating
                }
                    <div className="big-card-school-home">
                        {this.props.lang === 'English' ? <div><span>Average Recommendation Rating</span><br/><br/></div> : 'Calificación Promedia de Recomendaciones'}
                        <p className="big__teacher__home__text">{this.state.averageRecommendationsRate}</p>
                    </div>
                </div>
                <div className="col-md-4">
                {
                    //Average Questions Rating
                }
                    <div className="big-card-school-home">
                        {this.props.lang === 'English' ? 'Average Question Rating' : 'Calificación Promedia de Preguntas'}
                        <br/><br/>
                        <p className="big__teacher__home__text">{this.state.averageQuestionsRate}</p>
                    </div>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-sm-4"/>
                <div className="col-sm-4">
                {
                    //Top Challenge Categories card
                }
                    <div className="big-card-school-home">
                    {this.props.lang === 'English' ? 'Top Challenge Categories' : 'Categorías de Retos Más Vistas'}
                    <br/>
                    <br/>
                        <div className="list-group">
                            <div className="top_targets">
                            {
                                //Category 1
                            }
                                <div className="list-group-item">
                                    <span>{this.state.top1}</span>
                                    <div className="text-center">
                                        <div className="badge">
                                            {this.state.top1v}
                                        </div>
                                    </div>
                                </div>
                                {
                                    //Category 2
                                }
                                <div className="list-group-item">
                                    <span>{this.state.top2}</span>
                                    <div className="text-center">
                                        <div className="badge">
                                            {this.state.top2v}
                                        </div>
                                    </div>
                                </div>
                                {
                                    //Category 3
                                }
                                <div className="list-group-item">
                                    <span>{this.state.top3}</span>
                                    <div className="text-center">
                                        <div className="badge">
                                            {this.state.top3v}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4"/>
            </div>
        </div>
    </div>
     )}
     //Redirect user to login page if not authorized. 
     no={() => <Redirect to="/login" />}
   />);
    }
}

//Map language settings to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
    };
};

//Connect component to the controller. 
export default connect(mapStateToProps)(SchoolHome);