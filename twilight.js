document.addEventListener('DOMContentLoaded', () => {
    const twilightList= document.getElementById('cards')
    const alexButton = document.getElementById('alex-button')
    const isaacButton = document.getElementById('isaac-button')
    const lazerButton = document.getElementById('lazer-button')
    const addEpisodeButton = document.getElementById('episode-adder')
    const episodeSubmitterForm = document.getElementById('new-episode-submitter')
    const episodeFinderForm = document.getElementById('episode-finder')
    const episodeFinderHideAdvice = document.getElementById('hide-finder-advice')

    let currentUserNumber = 1
    alexButton.disabled = true

    episodeSubmitterForm.style.display = 'none'
    episodeFinderHideAdvice.style.display = 'none'

    addEpisodeButton.addEventListener('click', () => {
        if (episodeSubmitterForm.style.display === 'none'){
            episodeSubmitterForm.style.display = 'block'
            addEpisodeButton.textContent = 'Hide'
        }else{
            episodeSubmitterForm.style.display = 'none'
            addEpisodeButton.textContent = 'Add New Episode'
        }
    })

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
        episodeCard.id = parseInt(episode.number)

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

        let episodeRating = episode.rating

        let episodeCardRating = document.createElement('p')
        episodeCardRating.textContent = `Rating: ${episodeRating}/10`
        episodeCard.appendChild(episodeCardRating)
        
        const buttonContainer = document.createElement('div')
        episodeCard.appendChild(buttonContainer)

        const rateHigherButton = document.createElement('button')
        rateHigherButton.textContent = '+'
        buttonContainer.appendChild(rateHigherButton)

        rateHigherButton.addEventListener('click', (e) => {
            const episodeID = e.target.parentElement.parentElement.id
            if (episodeRating < 10){
            episodeRating++
            episodeCardRating.textContent = `Rating: ${episodeRating}/10`
            updateRating(e, episodeID)
            }
        })

        const rateLowerButton = document.createElement('button')
        rateLowerButton.textContent = '-'
        buttonContainer.appendChild(rateLowerButton)

        rateLowerButton.addEventListener('click', (e) => {
            const episodeID = e.target.parentElement.parentElement.id
            if (episodeRating > 0){
            episodeRating--
            episodeCardRating.textContent = `Rating: ${episodeRating}/10`
            updateRating(e, episodeID)
            }
        })

        function updateRating(e, episodeID){
            fetch(`http://localhost:3000/users/${currentUserNumber}`)
            .then(res => res.json())
            .then(userData => {
                userData.twilightZone.forEach(episode => {
                    if (parseInt(episode.number) === parseInt(episodeID)){
                        if(e.target.textContent === '+'){
                            episode.rating++
                        }else{
                            episode.rating--
                        }
                        fetch(`http://localhost:3000/users/${currentUserNumber}`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(userData)
                        })
                    }
                })
            })
        }

        let episodeCardReview = document.createElement('p')
        episodeCardReview.textContent = episode.review
        episodeCard.appendChild(episodeCardReview)

        let episodeCardCommentsContainer = document.createElement('div')
        episodeCardCommentsContainer.className = 'comments-container'

        let episodeCardCommentsHeader = document.createElement('p')
        episodeCardCommentsHeader.className = 'comment-section-header'
        episodeCardCommentsHeader.textContent = 'COMMENTS:'
        episodeCardCommentsContainer.appendChild(episodeCardCommentsHeader)

        if (episode.comments){

            let episodeCardCommentsNumber = document.createElement('p')
            episodeCardCommentsNumber.id = `comments-${episodeCard.id}`
            episodeCardCommentsNumber.className = 'comment-section'
            episodeCardCommentsNumber.textContent = `See Comments`
            episodeCardReview.appendChild(episodeCardCommentsNumber)

            episodeCardCommentsNumber.addEventListener('click', () => {
                if (episodeCardCommentsContainer.style.display === 'none'){
                    episodeCardCommentsContainer.style.display = 'block'
                    episodeCardCommentsNumber.textContent = 'Hide Comments'
                }else{
                    episodeCardCommentsContainer.style.display = 'none'
                    episodeCardCommentsNumber.textContent = `See Comments`
                }
            });
        
            episode.comments.forEach(comment => {
                let episodeCardComment = document.createElement('div')

                let episodeCardCommentAuthor = document.createElement('p')
                episodeCardCommentAuthor.className = 'comment-author'
                episodeCardCommentAuthor.textContent = `${comment.author}:`
                episodeCardComment.appendChild(episodeCardCommentAuthor)

                let episodeCardCommentContent = document.createElement('p')
                episodeCardCommentContent.className = 'comment-content'
                episodeCardCommentContent.textContent = `${comment.comment}`
                episodeCardComment.appendChild(episodeCardCommentContent)

                episodeCardCommentsContainer.appendChild(episodeCardComment)
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
            }else{
                commentSection.style.display = 'none'
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

        episodeCard.appendChild(commentSection)
        commentSection.style.display = 'none';

        commentSection.addEventListener('submit', (e) => {
            e.preventDefault()

            let newCommentObject = {
                author:commenterDropdown.value,
                comment:commentArea.value
            }

            let episodeCardComment = document.createElement('div')

            let episodeCardCommentAuthor = document.createElement('p')
            episodeCardCommentAuthor.className = 'comment-author'
            episodeCardCommentAuthor.textContent = `${newCommentObject.author}:`
            episodeCardComment.appendChild(episodeCardCommentAuthor)

            let episodeCardCommentContent = document.createElement('p')
            episodeCardCommentContent.className = 'comment-content'
            episodeCardCommentContent.textContent = `${newCommentObject.comment}`
            episodeCardComment.appendChild(episodeCardCommentContent)

            episodeCardCommentsContainer.appendChild(episodeCardComment)

            episodeCardCommentsContainer.style.display = 'block'

            let episodeCardCommentsNumber = episodeCard.querySelector(`#comments-${episodeCard.id}`)

            if (episodeCardCommentsNumber){
                episodeCardCommentsNumber.textContent = 'Hide Comments'
            }else{
                let episodeCardCommentsNumber = document.createElement('p')
                episodeCardCommentsNumber.id = `comments-${episodeCard.id}`
                episodeCardCommentsNumber.className = 'comment-section'
                episodeCardCommentsNumber.textContent = 'Hide Comments'
                episodeCardReview.append(episodeCardCommentsNumber)

                episodeCardCommentsNumber.addEventListener('click', () => {
                    if (episodeCardCommentsContainer.style.display === 'none'){
                        episodeCardCommentsContainer.style.display = 'block'
                        episodeCardCommentsNumber.textContent = 'Hide Comments'
                    }else{
                        episodeCardCommentsContainer.style.display = 'none'
                        episodeCardCommentsNumber.textContent = 'See Comments'
                    }
                });
            }

            addCommentToJSON(e, newCommentObject)

            commentSection.reset()
        })

        function addCommentToJSON(e, newCommentObject){
            const episodeID = e.target.parentElement.id
            fetch(`http://localhost:3000/users/${currentUserNumber}`)
            .then(res => res.json())
            .then(userData => {
                userData.twilightZone.forEach(episode => {
                    if (parseInt(episodeID) === parseInt(episode.number)){
                        if (!episode.comments) {
                            episode.comments = []
                        }
                        episode.comments.push(newCommentObject)

                        const updatedTwilightZone = userData.twilightZone.map(ep => {
                            if (ep.number === parseInt(episodeID)) {
                                return episode
                            } else {
                                return ep
                            }
                        });

                        userData.twilightZone = updatedTwilightZone;

                        fetch(`http://localhost:3000/users/${currentUserNumber}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        })
                    }
                })
            })
        }

        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.textContent = 'DELETE'
        episodeCard.appendChild(deleteButton)
        deleteButton.addEventListener('click', (e) => {
            const confirmed = window.confirm('Are you sure you want to delete this episode?')
            if (confirmed){
                episodeCard.remove()
                let episodeID = e.target.parentElement.id

                fetch(`http://localhost:3000/users/${currentUserNumber}`)
                .then(res => res.json())
                .then(userData => {
                    const newUserData = { twilightZone: [] }
                    userData.twilightZone.forEach(episode => {
                        if (parseInt(episode.number) !== parseInt(episodeID)){
                            newUserData.twilightZone.push(episode)
                        }
                        fetch(`http://localhost:3000/users/${currentUserNumber}`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(newUserData)
                        })
                    })
                })
            }
        })

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

    episodeSubmitterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let newEpisodeObject = {
            number:parseInt(e.target.episode.value),
            title:e.target.title.value,
            image_url:e.target.image_url.value,
            synopsis:e.target.synopsis.value,
            rating:e.target.rating.value,
            review:e.target.review.value
        }
        if (!isNaN(newEpisodeObject.number)){
            addNewEpisode(newEpisodeObject)
        }
        episodeSubmitterForm.reset()
    })

    function addNewEpisode(newEpisodeObject){
        if (newEpisodeObject.title){
            fetch(`http://localhost:3000/users/${currentUserNumber}`)
            .then(res => res.json())
            .then(userData => {
                newEpisodeObject.id = userData.twilightZone.length + 1
                userData.twilightZone.push(newEpisodeObject)
                fetch(`http://localhost:3000/users/${currentUserNumber}`,{
                    method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userData)
                })
            })
            setTimeout(() => {
                twilightList.innerText = ''
                renderEpisodeList()
            }, 500);
        }
    }

    episodeFinderForm.addEventListener('submit', (e) => {
        e.preventDefault()
        findEpisode()
        episodeFinderForm.reset()
        episodeFinderHideAdvice.style.display = 'block'
    })

    function findEpisode(){
        let episodeNumber = parseInt(episodeFinderForm.querySelector('#finder-episode').value)
        let matchFound = false;
        fetch(`http://localhost:3000/users/${currentUserNumber}`)
        .then(res => res.json())
        .then(userData => {
            userData.twilightZone.forEach(episode => {
                if (parseInt(episode.number) === episodeNumber){
                    twilightList.innerText = ''
                    renderEpisode(episode)
                    matchFound = true;
                }
            })

            if (matchFound === false){
                {
                    const noMatch = document.createElement('h1')
                    noMatch.textContent = 'No Match Found'
                    noMatch.style.textAlign = 'center'
                    twilightList.innerText = ''
                    twilightList.appendChild(noMatch)
                    setTimeout(() => {
                        twilightList.textContent = ''
                        renderEpisodeList()
                        episodeFinderHideAdvice.style.display = 'none'
                    }, 5000);
                }
            }
        })
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' && e.ctrlKey){
        twilightList.innerText = ''
        renderEpisodeList()
        }
    })

    renderEpisodeList()
})