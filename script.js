const singleLyrics = document.querySelector(".single-lyrics");
const searchResult = document.querySelector(".search-result");
const errorMessage = document.getElementById("error-massage");
const init = () => {
  singleLyrics.innerText = '';
  searchResult.innerHTML = '';
  errorMessage.innerText = '';
}
const searchSong = () => {
  const songName = document.getElementById("song-name").value;
  fetch(` https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => showSong(data.data))
    .catch(error => displayError('Sorry,This song is not available now'))
}
document.querySelector(".search-btn").addEventListener("click", searchSong)

const showSong = songData => {
  init()
  songData.forEach(element => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    const songInfo = `
    <div class="col-md-9">
      <h3 class="lyrics-name">${element.title}</h3>
      <p class="author lead">Album by <span>${element.artist.name}</span></p>
      <audio controls>
        <source src="${element.preview}" type="">
      </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
      <button onclick="displayLyrics('${element.artist.name}','${element.title}'),location.href='#lyrics'" class="btn btn-success">Get Lyrics</button>
    </div>`;
    songDiv.innerHTML = songInfo;
    searchResult.appendChild(songDiv);
  });
}

const displayLyrics = (artistName, songTitle) => {
  fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
    .then(res => res.json())
    .then(data => renderLyrics(data.lyrics))
    .catch(error => displayError('Sorry,Lyrics can not be found, try agein later'));
}

const renderLyrics = lyrics => {
  singleLyrics.innerText = lyrics;
}

const displayError = error => {
  errorMessage.innerText = error;
}