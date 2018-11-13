import React from 'react';
import {connect} from 'react-redux';
import TeacherButtonList from './TeacherButtonList';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {loadPlan} from '../../actions/plan';

class Plans extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coupon: '',
            couponValid: false,
            couponShow: false,
            couponError: '',
            status: ''
        }
    }
    componentWillMount(){
        axios.get('http://localhost:3000/teacher/settings/plans',
        {
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
        .catch(error=>{
            this.setState({couponShow: false, status});
        })
        .then(response => {
            this.setState({status: response.data.subscription[0].status});
            console.log("PLANS RESPONSE: ", response);
        });
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

    subscribeToPlan = (e) => {
        e.preventDefault();
        this.props.history.replace('/teacher/settings/plans/payment');
    }

    resubscribeToPlan = (e) => {
        e.preventDefault();
        //TO-DO ADD ACTION TO RESUBSCRIBE TO PLAN
        console.log('resubsribe to plan');
    }

    cancelPlan = (e) => {
        e.preventDefault();
        console.log("WHY????? ",auth0Client.getIdToken());
        axios.post('http://localhost:3000/teacher/settings/plans/cancel',{},
        {headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
    .then((response)=>{
        console.log(response);
    });
    }

    render(){
        return(
            <Can
            role={auth0Client.getRole()}
            perform="teacher:settings"
            yes={() => (
            <div>
                <TeacherButtonList/>
                {this.props.lang === 'English' ? <h3>Plan</h3> : <h3>Planes</h3>}
                {this.props.lang === 'English' ? <h4>Name: {this.props.plan.name} Package</h4> : <h4>Nombre: Paquete {this.props.plan.name}</h4>}
                {this.state.status === 'active' && this.props.lang === 'English' && <button onClick={this.cancelPlan}>Cancel Plan</button>}
                {this.state.status === 'active' && this.props.lang === 'Spanish' && <button onClick={this.cancelPlan}>Cancelar Plan</button>}
                {this.state.status === 'suspended' && this.props.lang === 'English' && <button onClick={this.subscribeToPlan}>Resubscribe</button>}
                {this.state.status === 'suspended' && this.props.lang === 'Spanish' && <button onClick={this.subscribeToPlan}>Resubscribirse</button>}
                {this.state.status === '' && this.props.lang === 'English' && <button onClick={this.subscribeToPlan}>Suscribirse</button>}
                {this.state.status === '' && this.props.lang === 'Spanish' && <button onClick={this.subscribeToPlan}>Subscribe</button>}
                <br/>
                {/* {this.state.status === 'active' && this.props.lang === 'English' && <h3>Coupon Code:</h3>}
                {this.state.status === 'active' && <input type="text" value={this.state.coupon} placeholder='Insert coupon code here' onChange={this.onCouponChange}/>}
                {this.state.status === 'active' && <button disabled={!this.state.couponValid} onClick={this.applyCoupon}>{this.props.lang === 'English' ? 'Apply Code' : 'Aplicar Código'}</button>}
                <br/> */}
            </div>
                             )}
                             no={() => <Redirect to="/" />}
                           />
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