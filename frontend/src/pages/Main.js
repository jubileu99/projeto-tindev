import React, { useEffect, useState} from 'react';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'

export default function Main({ match }){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs',{
                headers:{
                    user: match.params.id,
                }
            })
            console.log(response.data);
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    return(
       <div className="main-container">
           <img src={logo} alt="tindev"/>
           <ul>
               {users.map( user => (
                <li>
                   <img src={user.avatar} alt=""/>
                <footer>
                   <strong>user.name</strong>
                   <p>user.bio</p>
                </footer>
                <div className="buttons">
                   <button type="button">
                       <img src={dislike} alt=""/> 
                   </button>
                   <button type="button">
                       <img src={like} alt=""/>
                   </button>
                </div>
                </li>
               ))}
           </ul>
       </div>
    );
}