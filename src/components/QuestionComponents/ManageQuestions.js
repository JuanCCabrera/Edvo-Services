import React from 'react';
import {connect} from 'react-redux';
import PendingQuestionsList from './PendingQuestionsList';
import QuestionFilters from '../Filters/QuestionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

/**
 * Manage Questions page layout. 
 * @param {*} props - Default properties
 */
const ManageQuestions = (props) => (
    //Authenticate user information to grant access to ManageQuesitons page. 
    <Can
    role={auth0Client.getRole()}
    perform="admin:questions-manage"
    yes={() => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                {
                    //Page title
                }
                <div className="text-center pending__title__2">
                    <p>{props.lang === 'English' ? 'Pending Questions' : 'Preguntas \nPendientes'}</p>
                    <hr className="break"/>
                </div>
                {
                    //Question Filters
                }
                    <QuestionFilters/>
                {
                    //Pending Questions list
                }
                    <PendingQuestionsList/>
                </div>
            </div>
        </div>
    </div>
        )}
        //Redirect user to login page if not authorized. 
        no={
        () => <Redirect to="/login" />}
      />
);

//Map language settings to component properties. 
const mapStatetoProps = (state) => {
    return{
        lang: state.language.lang
    }
}
//Connect component to central controller. 
export default connect(mapStatetoProps)(ManageQuestions);