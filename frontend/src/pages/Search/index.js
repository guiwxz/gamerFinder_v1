import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { useHistory } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useStyles from '../../utils/styles-ui'

import api from '../../services/api';

function Map(){
    
    const [selected, setSelected] = useState(null);
    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState(null);
    
    const history = useHistory();

    const _id = localStorage.getItem('_id');

    useEffect(() => { 
        async function fetchData(){      
            const response2 = await api.get('list');
            const response = await api.get(`load/${_id}`);

            setCurrent(response.data)
            setUsers(response2.data);
        }
        fetchData();
    });
    

    const classes = useStyles();
    const [filter, setFilter] = useState('');
    
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    function handleConnections(link, i){
        if(link !== '' && i === 0){
            return <h4 key={i}>STEAM</h4>
        }
        if(link !== '' && i === 1){
            return <h4 key={i}>XBOX</h4>
        }
        if(link !== '' && i === 2){
            return <h4 key={i}>PSN</h4>
        }
    }

    function goToProfile(user){
        history.push({pathname: '/usersProfile', state: {user: user}})
    }

    function reload(){}


    return (   
        !current ? <p> loading.. coloca algum componente bonito de loading aqui, um svg com circulo girando.. seja criativo </p>  : ( 

        <div className="map-container" style={{display: 'flex'}}>
        
        <div className="option-container">
            <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="select-filter-label">Filter</InputLabel>
                <Select
                    labelId="select-filter"
                    id="select-filter"
                    value={filter}
                    onChange={handleChange}
                    label="Filter"
                >
                <MenuItem value="None">
                    <em>None</em>
                </MenuItem>
                
                {current.games.map((game, i)=>(
                    <MenuItem key={i} value={game}>{game}</MenuItem>
                ))}

                </Select>               
            </FormControl>

            <form onSubmit={reload}>
                <button type='submit'>Limpar filtro</button>
            </form>
            
        </div>
        
        <GoogleMap 
            defaultZoom={12} 
            defaultCenter={{ lat: current.location[0], lng: current.location[1] }}
        /*  defaultOptions={{styles: "procurar estilos no google (arquivo json)"}} -> é para mudar o estilo do mapa inteiro */
        >
            
            {users.map(user => {
                for(var i=0; i<user.games.length; i++){ 
                    console.log(user); 
                    if(filter === 'None'){
                       return(
                            <Marker
                                visible={true} 
                                key={user._id} 
                                position={{
                                    lat: user.login.length %2 === 0 ? (user.location[0]+(user.login.length*0.0001)) : (user.location[0]-(user.login.length*0.0001)),
                                    lng: user.login.length %2 === 0 ? (user.location[1]+(user.login.length*0.001)) : (user.location[1]-(user.login.length*0.001))
                                }}
                                onClick={ () => {
                                    setSelected(user);
                                    
                                }}
                                /*
                                icon={{
                                    url: user.avatar,
                                    scaledSize: new window.google.maps.Size(25, 25)
                                }} 
                                */
                            />  
                        ) 
                    }else{
                        if(user.games[i] === filter){
                            return(
                                <Marker
                                    visible={true} 
                                    key={user._id} 
                                    position={{
                                        lat: user.login.length %2 === 0 ? (user.location[0]+(user.login.length*0.0001)) : (user.location[0]-(user.login.length*0.0001)),
                                        lng: user.login.length %2 === 0 ? (user.location[1]+(user.login.length*0.001)) : (user.location[1]-(user.login.length*0.001))
                                    }}
                                    onClick={ () => {
                                        setSelected(user);
                                    }}
                                    /*
                                    icon={{
                                        url: user.avatar,
                                        scaledSize: new window.google.maps.Size(25, 25)
                                    }} 
                                    */
                                
                                />
                            
                            )
                        }
                    }
                            
                }
                                
                            
            })}
                 
            {selected && (
                <InfoWindow
                    position={{
                        lat: selected.location[0],
                        lng: selected.location[1]
                    }}
                    onCloseClick={()=>{
                        setSelected(null);
                    }}    
                >
                    <div>
                        <h1>{selected.nickname}</h1>
                        <div>
                        {
                            selected.connections.map((link, i) => {
                                return (handleConnections(link, i))                      
                            })
                        }
                        </div>

                        <ul>
                            {filter === 'None' ? null : <li><b>{filter}</b></li>}
                        {   
                           
                            selected.games.map((game, i) => {
                                if(filter === game) return
                                if(i > 5) return
                                if(i === 5) return <span>...</span>
                                return <li key={i}>{game}</li>
                            })
                        }
                        </ul>

                        <div>
                            <button onClick={() => {goToProfile(selected)}}>ACESSAR PERFIL</button>
                        </div>

                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
        </div>
    )
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))


 
export default function Search(){
 
    return(
        <div style={{width: '100vw', height: '100vh'}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBTbaiKv5tValb5TZbjTdRa1uEylV2QBf0`} 
                loadingElement={<div style={{ height: '100%' }}/>}
                containerElement={<div style={{ height: '100%' }}/>}
                mapElement={<div style={{ height: '100%' }}/>}               
            />
        </div>     
    )

} 
