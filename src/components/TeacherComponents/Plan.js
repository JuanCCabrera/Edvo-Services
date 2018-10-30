import React from 'react';
import {connect} from 'react-redux';
import TeacherButtonList from './TeacherButtonList';

class Plans extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 1,
            coupon: '',
        }
    }

    onCouponChange = (e) => {
        e.preventDefault();
        const coupon = e.target.value;
        this.setState(() => ({coupon}));
    }

    applyCoupon = (e) => {
        e.preventDefault();
    }

    upgradePlan = (e) => {
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <TeacherButtonList/>
                <h3>Plan</h3>
                <button onClick={this.upgradePlan}>Upgrade</button>
                <p>Coupon Code:</p>
                <input type="text" value={this.state.coupon} placeholder='Insert coupon code here' onChange={this.onCouponChange}/>
                <button disabled={this.state.coupon === ''} onClick={this.applyCoupon}>Apply Coupon</button>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        classes: state.classes
    }
}

export default connect(mapStateToProps)(Plans);