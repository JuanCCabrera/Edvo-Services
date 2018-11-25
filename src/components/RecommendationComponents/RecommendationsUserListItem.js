import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import { selectUser } from '../../actions/assignRecommendations';
import {selectUserToDisplay } from '../../actions/userModal';

const RecommendationsUserListItem = (props) => (
    <div className="list-group-item">
        <div className="row">
            <div className="col-sm-10 card-title">
                <p>
                    {props.user.name + ' ' + props.user.lastName} 
                </p>
            </div>
            <div className="col-sm-2">
                    {props.user.id === props.selectedUser && 
                    <div>
                        <span style={{display: 'inline'}}><i className="fa fa-check-circle fa-lg" style={{color: 'green'}} aria-hidden="true"></i></span>
                    </div>}
            </div>
        </div>
        <p>Email: {props.user.email}</p>
        {
            //<h6>Has weekly recommendation: {props.user.weeklyReco ? 'Yes' : 'No'}</h6>
        }
        <p>{props.lang === 'English' ? 'Categories' : 'Categorías'}: 
        <br/>
        {props.user.categories.map((category) => {
            return (
                <div key={uuid()}>
                <span className="badge" style={{backgroundColor: '#5933AA', marginBottom: '0.2rem', marginTop: '0.2rem'}}>{category + ' '}</span>
                <br/>
                </div>)
        })}
        </p>
            <button onClick={() => {
                props.dispatch(selectUser({userID: props.user.id}));
            }}>
                <p className="btn btn-item">
                    {props.lang === 'English' ? 'Select' : 'Seleccionar'}
                </p>
            </button>

            <button onClick={() => {
                props.dispatch(selectUserToDisplay(props.user));
            }}>
                <p className="btn btn-item">
                    {props.lang === 'English' ? 'View User Information' : 'Ver Más Información'}
                </p>
            </button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(RecommendationsUserListItem);