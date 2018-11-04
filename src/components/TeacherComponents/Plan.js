import React from 'react';
import {connect} from 'react-redux';
import TeacherButtonList from './TeacherButtonList';

class Plans extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coupon: '',
            couponValid: false,
            couponError: ''
        }
    }

    onCouponChange = (e) => {
        e.preventDefault();
        const couponCode = e.target.value;
        if(couponCode.length < 8){
            this.setState(() => ({coupon: couponCode, couponValid: false, couponError: ''}));
        }else{
            this.setState(() => ({coupon: couponCode, couponValid: true, couponError: ''}));
        }
    }

    applyCoupon = (e) => {
        e.preventDefault();
        //TO-DO ADD ACTION TO APPLY COUPON CODE
    }

    resubscribeToPlan = (e) => {
        e.preventDefault();
        //TO-DO ADD ACTION TO RESUBSCRIBE TO PLAN
        console.log('resubsribe to plan');
    }

    cancelPlan = (e) => {
        e.preventDefault();
        console.log('cancel plan');
        //TO-DO ADD ACITON TO CANCEL PLAN
    }

    render(){
        return(
            <div>
                <TeacherButtonList/>
                {this.props.lang === 'English' ? <h3>Plan</h3> : <h3>Planes</h3>}
                {this.props.lang === 'English' ? <h4>Name: {this.props.plan.name} Package</h4> : <h4>Nombre: Paquete {this.props.plan.name}</h4>}
                {this.props.plan.status === 'active' && this.props.lang === 'English' && <button onClick={this.cancelPlan}>Cancel Plan</button>}
                {this.props.plan.status === 'active' && this.props.lang === 'Spanish' && <button onClick={this.cancelPlan}>Cancelar Plan</button>}
                {this.props.plan.status === 'suspended' && this.props.lang === 'English' && <button onClick={this.resubscribeToPlan}>Resubscribe</button>}
                {this.props.plan.status === 'suspended' && this.props.lang === 'Spanish' && <button onClick={this.resubscribeToPlan}>Resubscribirse</button>}
                <br/>
                {this.props.lang === 'English' ? <h3>Coupon Code:</h3>: <h3>Código de Cupón</h3>}
                <input type="text" value={this.state.coupon} placeholder='Insert coupon code here' onChange={this.onCouponChange}/>
                <button disabled={!this.state.couponValid} onClick={this.applyCoupon}>{this.props.lang === 'English' ? 'Apply Code' : 'Aplicar Código'}</button>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        plan: state.plan,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(Plans);