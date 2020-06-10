import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logoColored.png';
import { FiArrowLeft } from 'react-icons/fi';

import {Button, TextField} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function Login(){
    const [login, setLogin] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const avatar = 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-512.png';
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const userData = {
            login, 
            nickname,
            password,
            avatar,
        }

        try{
            const response = await api.post('users', userData);
            if(response.data === 0){
                alert('Login já está sendo usado')
            }else{
                alert(`Registrado com sucesso, use ${login} para fazer login`);
                history.push('/');
            }
        } catch(err) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    const theme = createMuiTheme({
        palette: {
          primary: {
              main: '#4a53b5'
          }
        },
    });

    return(
        <div className="register-container"> 
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Registre-se para que possa encontrar jogadores perto de você!</p>
                
                    <form onSubmit={handleRegister}>
                        
                        <TextField
                            margin="dense"
                            autoFocus
                            variant="filled" 
                            className="textField" 
                            label="Login único" 
                            onChange={e => setLogin(e.target.value)} 
                            required
                        />
                        <TextField
                            margin="dense"
                            autoFocus 
                            variant="filled" 
                            className="textField" 
                            label="Nickname" 
                            onChange={e => setNickname(e.target.value)} 
                            required
                        />
                        <TextField
                            margin="dense"
                            autoFocus 
                            variant="filled" 
                            className="textField" 
                            label="Nova Senha" 
                            onChange={e => setPassword(e.target.value)} 
                            type="password" 
                            required
                        />

                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" className="button" type="submit">Cadastrar</Button>  
                        </ThemeProvider>                           
                    </form>

                    <Link to="/" className="login">
                        <FiArrowLeft size={16} color="#16208c" />
                        Volte para o Login
                    </Link>
                </section>

                <img src={logoImg} alt="GamerFinder" />
            </div>
        </div>
    )
}
/*
export default class Register extends Component {
    state = {
        login: '',
        nickname: '',
        password: '',
    }

    handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            login: this.state.login, 
            nickname: this.state.nickname, 
            password: this.state.password,
        }

        try{
            const response = await api.post('users', userData);
            if(response.data === 0){
                alert('Login já está sendo usado')
            }else{
                alert(`Registrado com sucesso, use ${this.state.login} para fazer login`);
            }
        } catch(err) {
            alert('Erro no cadastro, tente novamente');
        }
    }

    

    render(){
        const { login, nickname, password } = this.state;

        return(
            <div className="register-container">
                <div className="content">
                    <section>
                        <h1>Cadastro</h1>
                        <p>Registre-se para que possa encontrar jogadores perto de você!</p>
                    </section>
                    <form onSubmit={this.handleRegister}>
                        <input
                            placeholder="Seu login único (não poderá ser alterado)"
                            value={login}
                            onChange={e => this.setState({ login: e.target.value })}
                        />
                        <input
                            placeholder="Seu nickname"
                            value={nickname}
                            onChange={e => this.setState({ nickname: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />

                        <button className="button" type="submit">Cadastrar</button>       
                        
                    </form>
                    <Link to="/">
                            Volte para o Login
                    </Link>
                    
                </div>
            </div>
        )
    }
}
*/