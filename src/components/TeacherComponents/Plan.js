import React from 'react';
import {connect} from 'react-redux';
import TeacherButtonList from './TeacherButtonList';
import {Link} from 'react-router-dom';

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
            couponError: ''
        }
    }

    //Change coupon code in the local state. 
    onCouponChange = (e) => {
        e.preventDefault();
        const couponCode = e.target.value;
        //Coupon code must be 8 characters long
        if(couponCode.length < 8){
            //Mark coupon code as possible to submit
            this.setState(() => ({coupon: couponCode, couponValid: false, couponError: ''}));
        }else{
            //Disable submission button
            this.setState(() => ({coupon: couponCode, couponValid: true, couponError: ''}));
        }
    }

    //Apply coupon code to user. Not available until integrated with the database to verify the coupon information. 
    applyCoupon = (e) => {
        e.preventDefault();

        console.log('apply coupon ' + this.state.coupon);
        //TO-DO Integrate with the database
    }

    //Resubscribing to a plan is not available. Integration with the database is required. 
    resubscribeToPlan = (e) => {
        e.preventDefault();
        console.log('resubscribe to plan');
        //TO-DO: Integrate with the database
    }

    //Cancelling a plan is not available. Integration with the database is required. 
    cancelPlan = (e) => {
        e.preventDefault();
        console.log('cancel plan');
        //TO-DO: Integrate with the database
    }

    render(){
        return(
            <div>
            {
                //Teacher settings page links
            }
                <TeacherButtonList/>
                {
                    //Page title
                }
                {this.props.lang === 'English' ? <h3>Plan</h3> : <h3>Plan</h3>}
                {
                    //Name of package owned by teacher
                }
                {this.props.lang === 'English' ? <h4>Name: {this.props.plan.name} Package</h4> : <h4>Nombre: Paquete {this.props.plan.name}</h4>}
                {
                    //Link to Plans page to allow teacher to view the benefits of his or her subscription plan.
                }
                <div className="btn btn-default">
                    <Link to='/plans'>{this.props.lang === 'English' ? 'View Perks' : 'Ver Beneficios'}</Link>
                </div>
                {
                    //Cancel plan button
                }
                {this.props.plan.status === 'active' && this.props.lang === 'English' && <button onClick={this.cancelPlan}>
                    <div className="btn btn-default">
                        Cancel Plan
                    </div>
                </button>}
                {
                    //Cancel Plan button (translation)
                }
                {this.props.plan.status === 'active' && this.props.lang === 'Spanish' && <button onClick={this.cancelPlan}>
                    <div className="btn btn-default">
                        Cancelar Plan
                    </div>
                </button>}
                {
                    //Resubscribe button
                }
                {this.props.plan.status === 'suspended' && this.props.lang === 'English' && <button onClick={this.resubscribeToPlan}>
                <div className="btn btn-default">
                        Resubscribe
                    </div>
                </button>}

                {
                    //Resubscribe button (translation)
                }
                {this.props.plan.status === 'suspended' && this.props.lang === 'Spanish' && <button onClick={this.resubscribeToPlan}>
                <div className="btn btn-default">
                        Resuscribirse
                    </div>
                </button>}
                <br/>
                {
                    //Coupon code input field
                }
                {this.props.lang === 'English' ? <h4>Coupon Code:</h4>: <h4>Código de Cupón:</h4>}
                <input type="text" value={this.state.coupon} placeholder='Insert coupon code here' onChange={this.onCouponChange}/>
                {
                    //Submit coupon code button
                }
                <button disabled={!this.state.couponValid} onClick={this.applyCoupon}>{this.props.lang === 'English' ? 'Apply Code' : 'Aplicar Código'}</button>
                <br/>
            </div>
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