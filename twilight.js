document.addEventListener('DOMContentLoaded', () => {
    const twilightContainer = document.getElementById('episode-container')

    function renderEpisodeList(){
        fetch('http://localhost:3000/twilightZone')
        .then(res => res.json())
        .then(episodeList => {
            episodeList.forEach(episode => {
                const episodeCard = document.createElement('p')
                episodeCard.textContent = episode.title
                twilightContainer.appendChild(episodeCard)
            })
        })
    }

    renderEpisodeList()
})