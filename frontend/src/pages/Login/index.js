import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import {FiLogIn} from 'react-icons/fi';
import '../../global.css';
import './styles.css';

import {Button, TextField} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import logoImg from '../../assets/logoColored.png';

export default function Login(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('login', { login });
            if(password === response.data.password){
                localStorage.setItem('_id', response.data._id);
                
                history.push('/profile')
            }else{
                alert('Senha incorreta');
            }

        } catch(err){
            alert('Falha no login. Tente novamente');
        }
    }

    //const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
          primary: {
              main: '#4a53b5'
          }
        },
    });

    return(
        <div className="login-container">
            <div className="content">
                <section className="title">
                    <img src={logoImg} alt="Gamer Finder"/>
                    <h1>Faça seu Login</h1>
                </section>
                <form onSubmit={handleLogin}>
                    <TextField variant="filled" className="textField" label="Login" onChange={e => setLogin(e.target.value)}/>
                    <TextField variant="filled" className="textField" label="Senha" onChange={e => setPassword(e.target.value)} type="password"/>

                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" className="button" type="submit">Logar</Button>  
                    </ThemeProvider>
                
                <Link to="/register" className="register">
                    <FiLogIn id="login" size={16} color="#16208c" />
                    Registre-se
                </Link>
                </form>
            </div>
        </div>
    )
}

/*
<button type="submit"> Logar </button> 


export default class Login extends Component {
    state = {
        login: '',
        password: '',
    }

    handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await api.post('login', this.state);

            localStorage.setItem('userLogin', this.state.login);
            localStorage.setItem('userNickname', response.data.nickname);
            alert('Logado com sucesso');

            this.history.push('/profile')

        } catch(err){
            alert('Falha no login. Tente novamente');
        }
    }

    handleLogout = () => {
        localStorage.clear();
    }
    
    render(){
        const { login } = this.state;

        return(
            <div className="login-container">
                <div className="content">
                    <section>
                        <h1>Faça seu Login</h1>
                    </section>
                    <form onSubmit={this.handleLogin}>
                        <input 
                            placeholder="Seu login"
                            value={login}
                            onChange={e => this.setState({login: e.target.value})}
                        />

                        <button type="submit"> Logar </button>
                    </form>
                    <Link to="/register">
                        Registre-se
                    </Link>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        )
    }
}



<form onSubmit={handleLogin}>
                    <input 
                        placeholder="Seu login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit"> Logar </button>    
                    
                </form>









*/


