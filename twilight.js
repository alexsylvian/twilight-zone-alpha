document.addEventListener('DOMContentLoaded', () => {
    const twilightList= document.getElementById('cards')
    const alexButton = document.getElementById('alex-button')
    const isaacButton = document.getElementById('isaac-button')
    const lazerButton = document.getElementById('lazer-button')

    let currentUserNumber = 1
    alexButton.disabled = true

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
        episodeCardTitle.className = 'card-header'
        episodeCardTitle.textContent = `Episode ${episode.number}: ${episode.title}`
        episodeCard.appendChild(episodeCardTitle)

        let episodeCardImage = document.createElement('img')
        episodeCardImage.src = episode.image_url
        episodeCard.appendChild(episodeCardImage)

        let episodeCardSynopsis = document.createElement('p')
        episodeCardSynopsis.textContent = episode.synopsis
        episodeCard.appendChild(episodeCardSynopsis)

        let episodeCardRating = document.createElement('p')
        episodeCardRating.textContent = `Rating: ${episode.rating}/10`
        episodeCard.appendChild(episodeCardRating)

        let episodeCardReview = document.createElement('p')
        episodeCardReview.textContent = episode.review
        episodeCard.appendChild(episodeCardReview)

        let episodeCardCommentsContainer = document.createElement('div')
        episodeCardCommentsContainer.className = 'comments-container'

        if (episode.comments){
            let episodeCardCommentsNumber = document.createElement('p')
            episodeCardCommentsNumber.className = 'comment-section'
            episodeCardCommentsNumber.textContent = `This review has ${episode.comments.length} comments.`
            episodeCard.appendChild(episodeCardCommentsNumber)

            episodeCardCommentsNumber.addEventListener('click', () => {
                episodeCardCommentsContainer.style.display = episodeCardCommentsContainer.style.display === 'none' ? 'block' : 'none';
            });
        
            episode.comments.forEach(comment => {
                let episodeCardComments = document.createElement('p');
                episodeCardComments.textContent = `${comment.author}: ${comment.comment}`;
                episodeCardCommentsContainer.appendChild(episodeCardComments);
            });
        
            episodeCardCommentsContainer.style.display = 'none';
        }

        episodeCard.appendChild(episodeCardCommentsContainer)

        const episodeCardCommentSectionButton = document.createElement('button')
        episodeCardCommentSectionButton.textContent = 'Comment'
        episodeCard.appendChild(episodeCardCommentSectionButton)
        episodeCardCommentSectionButton.addEventListener('click', () => {
            if (commentSection.style.display === 'none'){
                commentSection.style.display = 'block'
            }
        })

        const commentSection = document.createElement('form')
        commentSection.className = 'comments-form'
        const commentArea = document.createElement('textarea')
        commentSection.appendChild(commentArea)

        const submitCommentButton = document.createElement('button')
        submitCommentButton.textContent = "Submit Comment"
        commentSection.appendChild(submitCommentButton)

        const commenterLabel = document.createElement('label')
        commenterLabel.textContent = 'Commenter:'
        commentSection.appendChild(commenterLabel)

        const commenterDropdown = document.createElement('select')
        commenterDropdown.name = 'commenter'
        commenterLabel.appendChild(commenterDropdown)

        const commenterOptions = ['Alex', 'Isaac', 'Lazer']
        commenterOptions.forEach(optionText => {
            const option = document.createElement('option');
            option.textContent = optionText
            commenterDropdown.appendChild(option)
        })

    //     const identityDropdown = document.createElement('select');
    //     identityDropdown.name = 'identity';
    //     identityLabel.appendChild(identityDropdown);


    //     const identityOptions = ['Alex', 'Isaac', 'Lazer'];
    //     identityOptions.forEach(optionText => {
    //     const option = document.createElement('option');
    //     option.value = optionText.toLowerCase();
    //     option.textContent = optionText;
    //     identityDropdown.appendChild(option);
    // });

        episodeCard.appendChild(commentSection)
        commentSection.style.display = 'none';
        

        twilightList.appendChild(episodeCard)
    }

    alexButton.addEventListener('click', () => {
        alexButton.disabled = true
        isaacButton.disabled = false
        lazerButton.disabled = false
        currentUserNumber = 1
        twilightList.innerText = ''
        renderEpisodeList()
    })

    isaacButton.addEventListener('click', () => {
        alexButton.disabled = false
        isaacButton.disabled = true
        lazerButton.disabled = false
        currentUserNumber = 2
        twilightList.innerText = ''
        renderEpisodeList()
    })

    lazerButton.addEventListener('click', () => {
        alexButton.disabled = false
        isaacButton.disabled = false
        lazerButton.disabled = true
        currentUserNumber = 3
        twilightList.innerText = ''
        renderEpisodeList()
    })

    renderEpisodeList()
})