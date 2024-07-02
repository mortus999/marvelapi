import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterDetails = ({ characterId, onClose }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            if (!characterId) return;

            const PUBLIC_KEY = '9447e0d06d60bfd5e73973f76c216c15';
            const HASH = 'c6ad12e0b48a688ee4f7b4714a9d2bac';
            const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

            try {
                const response = await axios.get(url);
                setCharacter(response.data.data.results[0]);
            } catch (error) {
                console.error('Error fetching character detail from Marvel API', error);
            }
        };

        fetchCharacterDetail();
    }, [characterId]);

    if (!character) return <div>Loading...</div>;

    return (
        <div style={{ 
            backgroundColor: '#fff', 
            color: '#333', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
            maxWidth: '600px', 
            margin: '0 auto' 
        }}>
            <button onClick={onClose} style={{ 
                backgroundColor: '#ed1d24', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 20px', 
                fontSize: '16px', 
                borderRadius: '5px', 
                cursor: 'pointer', 
                marginBottom: '20px' 
            }}>Close</button>
            <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{character.name}</h2>
            <div style={{ marginBottom: '20px' }}>
                <img 
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                    alt={character.name} 
                    style={{ 
                        width: '100%', 
                        borderRadius: '10px', 
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' 
                    }} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>Description</h3>
                <p>{character.description || 'No description available'}</p>
            </div>
            <div>
                <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>Comics</h3>
                <ul style={{ padding: '0', listStyleType: 'none' }}>
                    {character.comics.items.map(comic => (
                        <li key={comic.resourceURI} style={{ fontSize: '16px', marginBottom: '5px' }}>{comic.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CharacterDetails;
