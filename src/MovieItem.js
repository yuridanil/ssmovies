import './MovieItem.css';

function MovieItem(props) {
    let m = props.movie;
    return (
        <div className="movieitem" onClick={e => {props.onClick(m.id)}}>
            <div className="movieposter" style={{ backgroundImage: `url(${m.poster?.previewUrl || m.backdrop?.previewUrl || "./noposter.png"})` }}>
            </div>
            <div className="movieinfo">
                <div className="moviename">{m.name}</div>
                <div className="movienamealt">{m.alternativeName}</div>
                <div className="moviedetails">
                    {m.year}&nbsp;
                    {m.countries[0]?.name}&nbsp;
                    {Math.trunc((m.isSeries ? m.seriesLength : m.movieLength) / 60)}ч&nbsp;{(m.isSeries ? m.seriesLength : m.movieLength) % 60}м&nbsp;
                    {m.isSeries ? "Сериал" : "Фильм"}&nbsp;
                </div>
                <div className="moviegenre">{m.genres.map(a => a.name).join(' • ')}</div>
                <div className="movierating">IMDB:&nbsp;{m.rating.imdb.toFixed(1)}&nbsp;KP:{m.rating.kp.toFixed(1)}</div>
                <div className="moviedesc">{m.description}</div>
            </div>
        </div>
    );
}

export default MovieItem;
