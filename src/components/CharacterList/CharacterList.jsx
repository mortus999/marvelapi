import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CharacterList.m.css';

const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 21;
    const maxPageButtons = 10; 

    const fetchCharacters = async (page) => {
        const PUBLIC_KEY = '9447e0d06d60bfd5e73973f76c216c15';
        const HASH = 'c6ad12e0b48a688ee4f7b4714a9d2bac';
        const offset = (page - 1) * itemsPerPage;
        const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${offset}&limit=${itemsPerPage}`;
        try {
            const response = await axios.get(url);
            const newCharacters = response.data.data.results;
            setCharacters(newCharacters);
            setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
        } catch (error) {
            console.error('Error fetching data from Marvel API', error);
        }
    };

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        const pageButtons = [];
        for (let page = startPage; page <= endPage; page++) {
            pageButtons.push(
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
                >
                    {page}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div>
            <div className={styles.characterList}>
                {characters.map(character => (
                    <div key={character.id} className={styles.characterItem}>
                        <h2>{character.name}</h2>
                        <img
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={character.name}
                            className={styles.characterImage}
                            onClick={() => onCharacterSelect(character)}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={styles.pageButton}
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CharacterList;