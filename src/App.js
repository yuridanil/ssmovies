import './App.css';
import { useState } from 'react';
import { API_URL, API_TOKEN, SRC_URL } from './api';
import MovieItem from './MovieItem';
import { testdata } from './testdata';

let installPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});

function App() {

  const [showInstallButton, setShowInstallButton] = useState(
    !(window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches
    ));

  const page = 1;
  const limit = 20;
//  const [movies, setMovies] = useState(testdata.docs);
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleInstallClick = async (e) => {
    if (!installPrompt) {
      return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null;
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = (e) => {
    setMovies([]);
    const url = `${API_URL}?page=${page}&limit=${limit}&query=${searchValue}`;
    fetch(url, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "X-API-KEY": `${API_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error("Error:", error));
  };

  const setResults = (data) => {
    console.log(data);
    let docs = data.docs.sort((a, b) => ((b.isSeries ? 0 : 10000) + b.year) - ((a.isSeries ? 0 : 10000) + a.year));
    setMovies(docs);
  }

  const handleMovieClick = (id) => {
    window.location.href = SRC_URL + '/' + id + "/";
  }

  return (
    <div className="App">
      <div className="searchbar">
        <input id="searchtext" className="searchtext" type="text" placeholder="Название фильма" value={searchValue} onChange={handleSearchChange} />
        <button id="searchbutton" className="searchbutton" onClick={handleSearchClick}>Поиск</button>
        {showInstallButton && <button id="install" className="install" onClick={handleInstallClick}>Установить приложение</button>}
      </div>
      <div id="movielist" className="movielist">
        {movies.map((e, i) => {
          return <MovieItem key={i} movie={e} onClick={handleMovieClick} />;
        }
        )}
      </div>
    </div>
  );
}

export default App;
