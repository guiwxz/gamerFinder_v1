import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function UpdateUser(){
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [steam, setSteam] = useState('');
    const [xbox, setXbox] = useState('');
    const [psn, setPsn] = useState('');
    const [games, setGames] = useState([]);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [avatar, setAvatar] = useState('');

    const history = useHistory();
    
    // Verificação se o jogo existe no BD
    const [verificar, setVerificar] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');
    
    const _id = localStorage.getItem('_id');
    
    useEffect(() => {
        async function fetchData(){         
            const response = await api.get(`load/${_id}`);
            
            for(var i=0; i<3; i++){
                if(response.data.connections[i] === null){
                    response.data.connections[i] = '';
                }
            }
            if(response.data.description === null){
                response.data.description = '';
            }
            setNickname(response.data.nickname);
            setSteam(response.data.connections[0]);
            setXbox(response.data.connections[1]);
            setPsn(response.data.connections[2]);
            setGames(response.data.games);
            setLat(response.data.location[0]);
            setLng(response.data.location[1]);
            setDescription(response.data.description);
            setAvatar(response.data.avatar); 
        }

        fetchData();
    });

    async function handleUpdate(e){
        e.preventDefault();

        const connections = [steam, xbox, psn];
        const location = [lat, lng];
        await api.put(`/users/${_id}`, {nickname, description, connections, games, location, avatar});
        history.push('/profile');
    }

    async function verifyGame(e){
        e.preventDefault();

        const response = await api.get('games');
        const [ Games ] = response.data;

        const find = Games.Games.find(item => {
            return item === verificar ? true : false;  
        })  
        if(find === undefined){
            setVerifyMessage('Jogo não encontrado. Por favor verifique a ortografia ou veja a lista de jogos')

        }else{
            setVerifyMessage('Jogo verificado!');
            setGames([...games, verificar]);
        }
    }
    

    return(
        <div className="update-container">
            <div className="content">
                <h2>Atualizar informações</h2>
                <form onSubmit={handleUpdate}>
                    <input 
                        placeholder="Nickname"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                    <br />

                    <input
                        size="100"
                        placeholder="Avatar (Place URL image)"
                        onChange={e => setAvatar(e.target.value)}
                    />

                    <input 
                        size="100"
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <br/>
                    <input 
                        placeholder="Latitude"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                    />

                    <input 
                        placeholder="Longitude"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                    />
                    <span>Encontre suas coordenadas <a target="_blank" rel="noopener noreferrer" href="https://www.latlong.net/">aqui</a></span>
                    <br />
                    <input 
                        placeholder="Steam"
                        value={steam}
                        onChange={e => setSteam(e.target.value)}
                    />
                    <input 
                        placeholder="Xbox"
                        value={xbox}
                        onChange={e => setXbox(e.target.value)}
                    />
                    <input 
                        placeholder="PSN"
                        value={psn}
                        onChange={e => setPsn(e.target.value)}
                    />     
                    <br />
                    <input 
                        placeholder="League of Legends, Counter-Strike, Rainbow Six..."
                        onChange={e => setVerificar(e.target.value)}
                    />
                    <button type="button" onClick={verifyGame}>Verificar jogo</button>
                    <span> {verifyMessage}</span>

                                                               
                    <br />
                    
                    <button type="submit">Confirmar</button>
                </form>
            </div>

        </div>
    )
}

/*
<label for="DS" id="DS">*icon* Dark Souls</label>
                    <input
                        type="checkbox" 
                        id="DS" 
                        name="Dark Souls"
                        onC={(e) => {
                            setGames(games+"DarkSouls,");
                            document.querySelector('#DS').style.color = "red";
                        }}
                    />
                    <br />
                    
                    <label>*icon* Counter-Strike</label>
                    <input
                        type="checkbox" 
                        id="Counter-Strike" 
                        name="Counter-Strike"
                        onChange={e => setGames(games+"CounterStrike,")}
                    />
                    <br />

                    <label>*icon* Rocket League</label>
                    <input
                        type="checkbox" 
                        id="Rocket League" 
                        name="Rocket League"
                        onChange={e => setGames("RocketLeague,")}
                    />
                    <br />
*/

/**
 * <input id="RL" className="gamesButton" type="button" value="RocketLeague"
                            onClick={(e) => {
                                        if(!rl){
                                            setGames(games+rocketl);
                                            document.querySelector('#RL').style.backgroundColor = "green"; 
                                            setRL(true); 
                                        }else{
                                            setGames(games-rocketl);
                                            document.querySelector('#RL').style.backgroundColor = "white";
                                            setRL(false); 
                                        }                                  
                                    }}
                 
                    />

                    <input
                        id="SH"
                        className="gamesButton" 
                        type="button"
                        value="SoulHunters"
                        onClick={(e) => {
                                    if(!sh){
                                        setGames(games+soulh);
                                        document.querySelector('#SH').style.backgroundColor = "green"; 
                                        setSH(true); 
                                    }else{
                                        setGames(games-soulh);
                                        document.querySelector('#SH').style.backgroundColor = "white";
                                        setSH(false); 
                                    }                                  
                                 }}
                    />
 */