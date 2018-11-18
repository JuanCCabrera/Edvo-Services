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
                {this.props.lang === 'English' ? <h4>Name: {this.props.plan.name} Package</h4> : <h4>Nombre: Paquete {this.props.plan.name}</h4>}
                {
                    //Link to Plans page to allow teacher to view the benefits of his or her subscription plan.
                }
                
                <Link to='/plans' style={{color:'white', textDecoration: 'none'}}>
                        <div className="btn btn-item linktext">
                            {this.props.lang === 'English' ? 'View Perks' : 'Ver Beneficios'}
                        </div>
                    </Link>
                {
                    //Cancel plan button
                }
                {this.props.plan.status === 'active' && this.props.lang === 'English' && <button onClick={this.cancelPlan}>
                    <div className="btn btn-item">
                        Cancel Plan
                    </div>
                </button>}
                {
                    //Cancel Plan button (translation)
                }
                {this.props.plan.status === 'active' && this.props.lang === 'Spanish' && <button onClick={this.cancelPlan}>
                    <div className="btn btn-item">
                        Cancelar Plan
                    </div>
                </button>}
                {
                    //Resubscribe button
                }
                {this.props.plan.status === 'suspended' && this.props.lang === 'English' && <button onClick={this.resubscribeToPlan}>
                <div className="btn btn-item">
                        Resubscribe
                    </div>
                </button>}

                {
                    //Resubscribe button (translation)
                }
                {this.props.plan.status === 'suspended' && this.props.lang === 'Spanish' && <button onClick={this.resubscribeToPlan}>
                <div className="btn btn-item">
                        Resuscribirse
                    </div>
                </button>}
                <br/>
                {
                    //Coupon code input field
                }
                <div style={{marginTop: '3rem'}}>
                {this.props.lang === 'English' ? <h4>Coupon code:</h4>: <h4>Código de cupón:</h4>}
                <input type="text" className="form-control" style={{width: '80%'}} value={this.state.coupon} placeholder='Insert coupon code here' onChange={this.onCouponChange}/>
                {
                    //Submit coupon code button
                }
                <button disabled={!this.state.couponValid} onClick={this.applyCoupon}>
                    <div className="btn btn-item">
                        {this.props.lang === 'English' ? 'Apply Code' : 'Aplicar Código'}
                    </div>
                    </button>
                <br/>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
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