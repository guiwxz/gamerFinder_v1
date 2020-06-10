import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logoColored.png'

import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function Profile(){
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [connections, setConnections] = useState([]);
    const [games, setGames] = useState([]);

    const [current, setCurrent] = useState(null);
    const history = useHistory();
    const _id = localStorage.getItem('_id');

    useEffect(() => {
        async function fetchData(){
            const response = await api.get(`load/${_id}`);
            const userNickname = response.data.nickname;
            setAvatar(response.data.avatar);
            setNickname(userNickname);
            setDescription(response.data.description)
            setConnections(response.data.connections);
            setGames(response.data.games);

            setCurrent(response.data)
        }
        fetchData();
    });


    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    function connectionsButtons(link, i){
        if(link !== '' && link !== null && i === 0){
            return <a key={i} rel="noopener noreferrer" href={connections[0]} target="_blank"><button>STEAM</button></a>
        }
        if(link !== '' && link !== null && i === 1){
            return <a key={i} rel="noopener noreferrer" href={connections[1]} target="_blank"><button>XBOX</button></a>
        }
        if(link !== '' && link !== null && i === 2){
            return <a key={i} rel="noopener noreferrer" href={connections[2]} target="_blank"><button>PSN</button></a>
        }
    }


    const theme = createMuiTheme({
        palette: {
          primary: {
              main: '#4a53b5'
          }
        },
    });
    console.log(connections[1]);
    return(
        !current ? <p> loading.. coloca algum componente bonito de loading aqui, um svg com circulo girando.. seja criativo </p>  : (

        <div className="profile-container">
            <div className="menu">
                <img src={logoImg} alt="GF Logo"/>

                <Button variant="outlined" className="menu-buttons" onClick={() => { history.push('/search') }}>MAPA</Button>
                <Button variant="outlined" className="menu-buttons" onClick={() => { history.push('/UpdateUser') }}>Alterar Dados</Button>
            
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className="logout-button" onClick={handleLogout}>Logout</Button>  
                </ThemeProvider>
                
            </div>
            <div className="content">
                <div className="user">
                    <img src={avatar} alt="profileIMG"/>        
                    <hr/>        
                    <h1> {nickname} </h1>
                    <hr /> 
                    <h3>{description}</h3> 
                </div>                               
                <div className="connections">
                    <hr style={{ borderBottom: 'solid 3px', borderColor: '#4a53b5'}}/>
                    <h2>CONNECTIONS</h2>
                    <div className="connections-buttons">
                        {connections.map((link, i) => {
                            return (connectionsButtons(link, i));
                        })}                       
                    </div>

                </div>
                <div className="games">
                    <hr style={{ borderBottom: 'solid 3px', borderColor: '#4a53b5'}}/>
                    <h2>GAMES</h2>
                    <div className="games-buttons">
                        {games.map((game, i) => (
                            <span key={i}>{game}</span>
                        ))}                      
                    </div>
                </div>                
            </div>
        </div>
        )
    )
    
}
