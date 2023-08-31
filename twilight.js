document.addEventListener('DOMContentLoaded', () => {
    const twilightList= document.getElementById('cards')

    function renderEpisodeList(){
        fetch('http://localhost:3000/twilightZone')
        .then(res => res.json())
        .then(episodeList => {
            episodeList.forEach(episode => {
                renderEpisode(episode)
                // const episodeCard = document.createElement('div')
                // episodeCard.textContent = episode.title
                // twilightContainer.appendChild(episodeCard)
            })
        })
    }

    function renderEpisode(episode){
        let episodeCard = document.createElement('li')
        episodeCard.className = "episode-card"
        episodeCard.textContent = episode.title
        let episodeCardImage = document.createElement('img')
        episodeCardImage.src = episode.image_url
        episodeCard.appendChild(episodeCardImage)
        cards.appendChild(episodeCard)
    }

    renderEpisodeList()
})