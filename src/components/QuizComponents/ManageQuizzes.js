import React from 'react';
import PendingQuizzesList from './PendingQuizzesList';
import ReturnButtonList from './ReturnButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

const ManageQuizzes = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:quizzes-view"
    yes={() => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <div className="text-center well">
                        <ReturnButtonList/>
                    </div>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                    <div className="text-center pending__title__2">
                        <p>{props.lang === 'English' ? 'Pending Quizzes' : 'Pruebas \nPendientes'}</p>
                        <hr className="break"/>
                    </div>
                    <PendingQuizzesList/>
                </div>
            </div>
        </div>
    </div>     )}
     no={() => <Redirect to="/login" />}
   />
);

const mapStateToProps = (state) => {
    return{
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(ManageQuizzes);