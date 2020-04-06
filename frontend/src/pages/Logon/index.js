import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import '../../global.css'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Logon() {

    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Algo deu errado');
        }

    };

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>

                <form onSubmit={handleLogin}>
                    <h1> Faça seu Logon </h1>
                    <input
                        value={id}
                        onChange={e => setID(e.target.value)}
                        placeholder="Sua ID"
                    />
                    <button className="button" type="submit"> Entrar </button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size="16" color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"></img>
        </div>
    );
}