import './index.css';

const MovieTile = (props) => {
    const { title, poster, actors, onMovieClick } = props;

    const imgStyle = {
        backgroundImage: `url(${poster})`
    }

    return (
        <div className="tileContainer" onClick={onMovieClick}>
            <div className="tileContent" style={imgStyle} />
            <div>{title}</div>
            <div className="actorsText">{actors}</div>
        </div>
    )
};

export default MovieTile;