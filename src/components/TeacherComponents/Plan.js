import React from 'react';
import {connect} from 'react-redux';
import TeacherButtonList from './TeacherButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {loadPlan} from '../../actions/plan';
import {Link} from 'react-router-dom';
import {setSuccessModal} from '../../actions/successModal';
import {setFailureModal} from '../../actions/failureModal';
import { setLoadingModal } from '../../actions/loadingModal';

/**
 * Plan page in Teacher Settings. It displays the name of the subscription plan currently owned by the Teacher use (if any) or an option to resubscribe to the plan
 * if no subscription is owned at the moment. 
 */
class Plan extends React.Component{
    constructor(props){
        super(props);
        //The page includes a field to write a coupon code to generate a payment discount for the subscription. 
        this.state = {
            coupon: '',
            couponValid: false,
            couponShow: false,
            cardError: false,
            couponError: '',
            status: ''
        }
    }
    componentWillMount(){
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/teacher/settings/plans',
        {
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
        .catch(error=>{
            this.props.dispatch(setLoadingModal());
            if(error.response.status == 500 || error.response.status == 502)
                this.props.dispatch(setFailureModal());
        })
        .then(response => {
            if(response.status == 200){
                this.setState({status: response.data.subscription.status});
                this.props.dispatch(loadPlan({name: response.data.subscription.type, status: response.data.subscription.status}));
            }
            this.props.dispatch(setLoadingModal());
        });
    }

    //Change coupon code in the local state. 
    onCouponChange = (e) => {
        e.preventDefault();
        const couponCode = e.target.value;
        //Coupon code must be 8 characters long
        if(couponCode.length < 3){
            //Mark coupon code as possible to submit
            this.setState(() => ({coupon: couponCode, couponValid: false, couponError: ''}));
        }else{
            //Disable submission button
            this.setState(() => ({coupon: couponCode, couponValid: true, couponError: ''}));
        }
    }

    subscribeToPlan = (e) => {
        e.preventDefault();
        this.props.history.replace('/teacher/settings/plans/payment');
    }

    modifyPlan = (e) => {
        e.preventDefault();
        this.props.dispatch(setLoadingModal());
        axios.post('https://beta.edvotech.com/api/teacher/settings/plans',{
            action: this.state.status
        },
        {headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
    .then((response)=>{
        if(response.status == 201){
            this.props.dispatch(setSuccessModal());
            const stateStatus = this.state.status == 'active' ? 'suspended' : 'active';
            this.props.dispatch(loadPlan({status: stateStatus}));
            this.setState({status: stateStatus});
        }
        this.props.dispatch(setLoadingModal());
    })
    .catch(error => {
        this.props.dispatch(setLoadingModal());
        if(error.response.status == 402 || error.response.status == 403)
            this.setState({cardError: true});
        else{
            this.props.dispatch(setFailureModal());
        }
    });
    }

    render(){
        return(
            <Can
            role={auth0Client.getRole()}
            perform="teacher:settings"
            yes={() => (
            <div>
            <div className="background-home">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="text-center well">
                                {
                                    //Teacher settings page links
                                }
                                    <TeacherButtonList/>
                                    </div>
                            </div>
                        <div className="col-sm-1"/>
                <div className="col-sm-9">
                    <div className="big-card">
                {
                    //Page title
                }
                <div className="form__title text-center">
                    {this.props.lang === 'English' ? <p>Plan</p> : <p>Plan</p>}
                    <hr className="break" style={{borderColor: '#5933AA'}}/>
                </div>
                {
                    //Name of package owned by teacher
                }
                {this.props.lang === 'English' ? 
                 <div>
                    {this.props.plan.status =="active" ? 
                    <div>
                        <h4>Standard Package</h4>
                        <p>Benefits: </p>
                        <ul style={{listStyleType: 'square'}}>
                            <li>Weekly recommendations</li>
                            <li>Q&A with experts</li>
                            <li>User metrics</li>
                        </ul>
                        <br/>
                        <p>Monthly fee: $39.00</p>
                        <p>*This fee may be lower depending on the coupon code used during your subscription payment.</p>
                        

                    </div> : <h4> You are not currently subscribed. </h4>}
                </div>
                 :
                 <div>
                    {this.props.plan.status =="active" ? 
                        <div>
                        <h4>Paquete Estándar</h4>
                        <p>Beneficios: </p>
                        <ul style={{listStyleType: 'square'}}>
                            <li>Recomendaciones semanales</li>
                            <li>Preguntas y respuestas con expertos</li>
                            <li>Métricas de usuario</li>
                        </ul>
                        <br/>
                        <p>Cuota mensual: $39.00</p>
                        <p>*Esta cuota puede ser menor dependiendo del código del cupón utilizado durante el pago de su suscripción.</p>
                        
                        </div> : <h4> Usted no tiene un suscripción activa. </h4>}
                </div>
                }
                

                {this.state.cardError === true && 
                    <div className="text-danger text-center">
                        {this.props.lang === 'English' ? <p>The card used is no longer valid.</p> : <p>L tarjeta usada no es válida.</p>}
                    
                            <br/>
                  </div>
                }
                {this.state.status === 'suspended' && 
                    <div className="text-danger">
                        <br/>
                        {this.props.lang === 'English' ? <p>*If you are having problems with resubscribing please contact us at info@edvotech.com</p> : 
                        <p>*Si se enfrenta con problemas al momento de resuscribirse porfavor contactenos a info@edvotech.com</p>}
                    </div>
                }
                
                {
                    //Link to Plans page to allow teacher to view the benefits of his or her subscription plan.
                }
                
                <Link to='/plans' style={{color:'white', textDecoration: 'none', marginRight: '1rem'}}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'View All Offers' : 'Ver Ofertas'}
                        </div>
                </Link>

                {
                    //Cancel plan button
                }
                {this.state.status === 'active' && this.props.lang === 'English' && <button onClick={this.modifyPlan} className="btn btn-item">
                    <div>
                        Cancel Plan
                    </div>
                </button>}
                {
                    //Cancel Plan button (translation)
                }
                {this.state.status === 'active' && this.props.lang === 'Spanish' && <button onClick={this.modifyPlan} className="btn btn-item">
                    <div>
                        Cancelar Plan
                    </div>
                </button>}
                {
                    //Resubscribe button
                }
                {this.state.status === 'suspended' && this.props.lang === 'English' && <button onClick={this.modifyPlan} className="btn btn-item">
                    <div>
                        Resubscribe
                    </div>
                </button>}
                {
                    //Resubscribe button (translation)
                }
                {this.state.status === 'suspended' && this.props.lang === 'Spanish' && <button onClick={this.modifyPlan} className="btn btn-item">
                    <div>
                        Resuscribirse
                    </div>
                </button>}
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
                             )}
                             no={() => <Redirect to="/login" />}
                           />

        )
    }
}

//Map plan information and current language state to component. 
const mapStateToProps = (state) => {
    return{
        plan: state.plan,
        lang: state.language.lang
    }
}

//Connect component to controller. 
export default connect(mapStateToProps)(Plan);