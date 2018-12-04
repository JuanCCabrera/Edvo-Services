import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';

/**
 * Single item of the User List
 * @param {*} props - User list item information following the object model below:
    user: {
            id: '',
            name: '',
            lastName: '',
            email: '',
            weeklyReco : false,
            categories: []
        }
 */
class UserListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleButton: false
        }
    }
    
    render(){
        return (
        <div className="item-card">
            {
                //User's full name
            }
            <p className="item__body card-title">{this.props.user.name + ' ' + this.props.user.lastName}</p>
            {
                //User's email
            }
            <p className="item__body">Email: {this.props.user.email}</p>
            {
                //User assignment status
            }
            <p className="item__body">{this.props.lang === 'English' ? 'Has received weekly recommendation' : 'Ha recibido recomendación semanal'}: 
            {this.props.lang === 'English' ? (this.props.user.weeklyReco ? ' Yes' : ' No') : (this.props.user.weeklyReco ? ' Si' : ' No')}</p>
            {
                //User challenges categories (as filled in registration)
            }
            <span className="item__body">{this.props.lang === 'English' ? 'Categories' : 'Categorías'}: 
            <br/>
            {this.props.user.categories.map((category) => {
                return (<span key={uuid()}>
                    {category == "Teaching Strategies" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{this.props.lang === 'English' ? "Teaching Strategies" : "Estrategias de Enseñanza"}</span>}
                    {category == "Updated Material" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado'}</span>}
                    {category == "Time Management" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'}</span>}
                    {category == "Technology Integration" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnologia'}</span>}
                    {category == "Instructional Alignment" && <span className="badge" style={{margin: '0.5rem', backgroundColor: '#5933AA'}}>{this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineación Curricular'}</span>}
                </span>)
            })}
            </span>
            <br/>

            
            {
                //User removal button
            }

            {this.state.toggleButton ? 
            
            <div>

            {
                //User removal button
            }
                <div className="text-danger" style={{marginTop: '1rem', display: 'inline-block', maginBottom: '0'}}>
                    {this.props.lang === 'English' ? 'Are you sure you would like to remove this user?' : '¿Estás seguro de que quieres remover a este usuario?'}
                </div>
                <br/>
                <button onClick={() => {
                    this.props.userRemoval(); 
                    this.setState(() => ({toggleButton: false}));
                }}>
                {
                    //"Yes" button option
                }
                <div className="btn btn-item-red" style={{marginTop: '10px'}}>
                        {this.props.lang === 'English' ? 'Yes' : 'Si'}
                </div>
                </button>

                <button onClick={() => {
                    this.setState(() => ({toggleButton: false}));
                }}>
                {
                    //"No" button option
                }
                <div className="btn btn-item" style={{marginTop: '10px'}}>
                        {this.props.lang === 'English' ? 'No' : 'No'}
                </div>
                </button>
            </div>
            :
            <div>
            {
                //"Remove" button
            }
            <button onClick={() => {this.setState(() => ({toggleButton: true}))}}>
                <div className="btn btn-item" style={{marginTop: '10px'}}>
                    {this.props.lang === 'English' ? 'Remove' : 'Remover'}
                </div>
            </button>
            </div>
            }

        </div>
        );
        }
    }

//Map current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(UserListItem);