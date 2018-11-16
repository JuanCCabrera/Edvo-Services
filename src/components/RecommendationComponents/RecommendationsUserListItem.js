import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import { selectUser } from '../../actions/assignRecommendations';

const RecommendationsUserListItem = (props) => (
    <div className="list-group-item">
        <div className="row">
            <div className="col-sm-10 card-title">
                <p>
                    {props.user.name + ' ' + props.user.lastName} 
                </p>
            </div>
            <div className="col-sm-2">
                <p>
                    {props.user.id === props.selectedUser && 
                    <div>
                        <span style={{display: 'inline'}}><i class="fa fa-check-circle" style={{color: 'green'}} aria-hidden="true"></i></span>
                    </div>}
                </p>
            </div>
        </div>
        <h5>Email: {props.user.email}</h5>
        {
            //<h6>Has weekly recommendation: {props.user.weeklyReco ? 'Yes' : 'No'}</h6>
        }
        <h6>{props.lang === 'English' ? 'Categories' : 'Categorías'}: 
        <br/>
        {props.user.categories.map((category) => {
            return (
                <div key={uuid()}>
                <span className="badge" style={{backgroundColor: '#5933AA', marginBottom: '0.2rem', marginTop: '0.2rem'}}>{category + ' '}</span>
                <br/>
                </div>)
        })}
        </h6>
            <button onClick={() => {
                props.dispatch(selectUser({userID: props.user.id}));
            }}>
                <div className="btn btn-item">
                    {props.lang === 'English' ? 'Select' : 'Seleccionar'}
                </div>
            </button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(RecommendationsUserListItem);