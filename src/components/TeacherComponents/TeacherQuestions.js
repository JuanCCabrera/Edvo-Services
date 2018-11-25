import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import TeacherQuestionsList from './TeacherQuestionsList';
import FavoriteTeacherQuestionsList from './FavoriteTeacherQuestionsList';
import TeacherQuestionFilters from '../Filters/TeacherQuestionFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';

/**
 * The Teacher Questions page contains a list of questions a teacher has made along with a list of questions the teacher has marked as favorites. 
 * @param {*} props - Default properties and current language state. 
 */
const TeacherQuestions = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="teacher:questions-view"
    yes={() => (
    <div className="background-home">
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    {
                        //Teacher Favorites list. 
                    }
                    <div className="text-center pending__title__2">
                    <p>{props.lang === 'English' ? 'Favorites' : 'Favoritas'}</p>
                    <hr className="break"/>
                    </div>
                    <FavoriteTeacherQuestionsList/>
                </div>
                <div className="col-sm-1"/>
                <div className="col-sm-7">
                {
                    //Teacher Questions list and filters for the list. 
                }
                    <div className="text-center pending__title__2 ">
                        <p>{props.lang === 'English' ? 'Questions' : 'Preguntas'}</p>
                        <hr className="break" style={{borderColor:'#5933AA'}}/>
                    </div>
                    <TeacherQuestionFilters/>
                    <TeacherQuestionsList/>
                </div>
            </div>
        </div>
    </div>
         )}
         no={() => <Redirect to="/login"/>}
       />
);

//Map current language state to the component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherQuestions);
