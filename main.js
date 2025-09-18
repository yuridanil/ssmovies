window.onload = () => {
    document.querySelector("#searchtext").focus();
    document.querySelector("#searchtext").click();
    document.querySelector("#searchtext").onkeydown = (e) => {
        if (e.code === "Enter")
            document.querySelector("#searchbutton").click();
    };
}

const handleSearchClick = () => {
    document.querySelector("#movielist").innerHTML = "";
    let
        page = 1,
        limit = 20,
        query = document.querySelector("#searchtext").value;
    const url = `${api_url}?page=${page}&limit=${limit}&query=${query}`;
    fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "X-API-KEY": `${token}`
        }
    })
        .then(response => response.json())
        .then(data => listMovies(data))
        .catch(error => console.error("Error:", error));
}

const handleMovieClick = (id) => {
    window.location.href = 'https://www.sspoisk.ru/film/' + id + "/";
}

const listMovies = (data) => {
    let docs = data.docs.sort((a, b) => ((b.isSeries ? 0 : 10000) + b.year) - ((a.isSeries ? 0 : 10000) + a.year));
    docs.forEach(e => {
        let item = document.querySelector("#template").cloneNode(true);
        item.id = e.id;
        let movieposter = item.getElementsByClassName("movieposter")[0];
        if (e.backdrop?.previewUrl) {
            movieposter.style.backgroundImage = `url(${e.backdrop.previewUrl})`;
            movieposter.innerHTML = "";
        } else if (e.poster?.previewUrl) {
            movieposter.style.backgroundImage = `url(${e.poster.previewUrl})`;
            movieposter.innerHTML = "";
        }
        item.getElementsByClassName("movieyear")[0].innerHTML = e.year;
        item.getElementsByClassName("movietype")[0].innerHTML = e.isSeries ? "Сериал" : "Фильм";
        item.getElementsByClassName("movieimdb")[0].innerHTML = "IMDB:" + e.rating.imdb.toFixed(1);
        item.getElementsByClassName("moviekp")[0].innerHTML = "KP:" + e.rating.kp.toFixed(1);
        item.getElementsByClassName("moviename")[0].innerHTML = e.name;
        item.getElementsByClassName("moviedesc")[0].innerHTML = e.shortDescription || e.description;
        item.style.display = "flex";
        document.querySelector("#movielist").appendChild(item);
    });
}
