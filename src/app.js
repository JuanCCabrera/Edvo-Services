import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'babel-polyfill';
import 'react-router';
import auth0Client from './Auth';


//Creating central controller
const store = configureStore();

//Edvo Services main application component (High-Order Component). 
class App extends React.Component{   
    async componentDidMount() {
        //Activate silent authentication. 
    try{
        await auth0Client.silentAuth();
        this.forceUpdate();
    }catch(err){
        if(err.error === 'login_required') return;
    }
}

    render() {
            return(
                //Provider tag allows application to connect to the central controller. 
                <Provider store={store}> 
                    {
                        //Application router which determines displayed component based on current URL. 
                    }
                    <AppRouter/>
                </Provider>
            );
        }

}

//Generate React top-level (HOC) component. 
ReactDOM.render(<App/>, document.getElementById('root')); 

