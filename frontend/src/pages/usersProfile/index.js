import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//import './styles.css';

export default function Profile(){
    const [nickname, setNickname] = useState('');
    const [descr, setDescr] = useState('');
    //const [games, setGames] = useState([]);
    //const [connections, setConnections] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const user = location.state.user;
        if(user.description === null){
            user.description = '';
        }
        setNickname(user.nickname)
        setDescr(user.description);
        //setGames(user.games);
        //setConnections(user.connections);
    }, [location]);


    return(
        <div className="profile-container">
            <div className="content">
                <h1> {nickname} </h1>

                <p>{descr}</p>                                               
                
            </div>
        </div>
    )
}