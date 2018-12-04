import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Button list allowing a user to travese to the Teacher Quizzes page. 
 * @param {*} props - Default component properties
 */
const QuizButtonList = (props) => (
    <div>
        <br/>
        {
            //Link to the Teacher Quizzes page. 
        }
        <Link to={"/teacher/quizzes"} style={{textDecoration: 'none'}}>
            <div className="nav__button">
                <div className="nav__button__text" style={{marginBottom: '1rem'}}>
                    {props.lang === 'English' ? 'View Pending Quizzes' : 'Ver Pruebas Pendientes'}
                </div>
            </div>
        </Link>
    </div>
);

export default QuizButtonList;