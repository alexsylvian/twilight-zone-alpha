document.addEventListener('DOMContentLoaded', () => {
    const twilightList= document.getElementById('cards')
    const alexButton = document.getElementById('alex-button')
    const isaacButton = document.getElementById('isaac-button')
    const lazerButton = document.getElementById('lazer-button')

    let currentUserNumber = 1

    function renderEpisodeList(){
        fetch(`http://localhost:3000/users/${currentUserNumber}`)
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

        let episodeCardSynopsis = document.createElement('p')
        episodeCardSynopsis.textContent = episode.synopsis
        episodeCard.appendChild(episodeCardSynopsis)

        let episodeCardReview = document.createElement('p')
        episodeCardReview.textContent = episode.review
        episodeCard.appendChild(episodeCardReview)

        twilightList.appendChild(episodeCard)
    }

    alexButton.addEventListener('click', () => {
        currentUserNumber = 1
        twilightList.innerText = ''
        renderEpisodeList()
    })

    isaacButton.addEventListener('click', () => {
        currentUserNumber = 2
        twilightList.innerText = ''
        renderEpisodeList()
    })

    lazerButton.addEventListener('click', () => {
        currentUserNumber = 3
        twilightList.innerText = ''
        renderEpisodeList()
    })

    renderEpisodeList()
})