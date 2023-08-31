document.addEventListener('DOMContentLoaded', () => {
    const twilightList= document.getElementById('cards')

    let currentUserNumber = 1

    function renderEpisodeList(){
        fetch('http://localhost:3000/users/1')
        .then(res => res.json())
        .then(user => {
            user.twilightZone.forEach(episode => {
                renderEpisode(episode)
            })
        })
    }

    function renderEpisode(episode){
        let episodeCard = document.createElement('li')
        episodeCard.className = "episode-card"
        // episodeCard.textContent = episode.title

        let episodeCardTitle = document.createElement('div')
        episodeCardTitle.textContent = `Episode ${episode.number}: ${episode.title}`
        episodeCard.appendChild(episodeCardTitle)

        let episodeCardImage = document.createElement('img')
        episodeCardImage.src = episode.image_url
        episodeCard.appendChild(episodeCardImage)

        // let episodeCardSynopsis = document.createElement

        // let episodeCardReview =

        cards.appendChild(episodeCard)
    }

    renderEpisodeList()
})