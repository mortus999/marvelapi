import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CharacterList from './components/CharacterList/CharacterList.jsx';
import CharacterDetails from './components/CharacterDetails/CharacterDetails.jsx';
import Header from './components/Header/Header.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import './App.css';

const AppContent = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    const handleCloseDetails = () => {
        setSelectedCharacter(null);
    };

    const location = useLocation();

    return (
        <div className={`App ${location.pathname === '/' ? 'homepage-background' : 'characters-background'}`}>
            <Header title={location.pathname === '/' ? '' : 'Marvel Characters'} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/characters" element={
                    <div className="content">
                        <CharacterList onCharacterSelect={handleCharacterSelect} />
                        {selectedCharacter && (
                            <CharacterDetails characterId={selectedCharacter.id} onClose={handleCloseDetails} />
                        )}
                    </div>
                } />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;