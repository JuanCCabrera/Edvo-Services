import React from 'react';
import {connect} from 'react-redux';
import QuestionButtonList from './QuestionButtonList';
import PendingQuestionsList from './PendingQuestionsList';
import QuestionFilters from '../Filters/QuestionFilters';

/**
 * Manage Questions page layout. 
 * @param {*} props - Default properties
 */
const ManageQuestions = (props) => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-2 text-center well">
                    <QuestionButtonList/>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-9">
                {
                    //Page title
                }
                <div className="text-center pending__title__2">
                    <p>{props.lang === 'English' ? 'Pending Questions' : 'Preguntas Pendientes'}</p>
                    <hr className="break"/>
                </div>
                    <QuestionFilters/>
                    <PendingQuestionsList/>
                </div>
            </div>
        </div>
    </div>
);

const mapStatetoProps = (state) => {
    return{
        lang: state.language.lang
    }
}
export default connect(mapStatetoProps)(ManageQuestions);