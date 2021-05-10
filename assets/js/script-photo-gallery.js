const galleryDiv = document.getElementById('gallery')
const seeMoreBtn = document.getElementById('see-more-btn')
const photoCounterDiv = document.getElementById('photo-counter')
let images = []
let imageCounter = 0;
const IMAGES_INCREMENT = 20;

seeMoreBtn.addEventListener('click', function(e) {
    displayMoreImages()
})

// fetch all but start with display only 50 images
async function getPhotos() {
    try {
        const fetchResponse = await fetch("https://jsonplaceholder.typicode.com/photos")
        if (!fetchResponse.ok) throw new Error("Sorry fail to fetch data.")
        const photos = await fetchResponse.json()
        images = photos
        galleryDiv.innerText = ""
        seeMoreBtn.style.display = "block"
        photoCounterDiv.style.display = "block"
        displayMoreImages()
    } catch (err) {
        galleryDiv.innerHTML = "Sorry failed to fetch photos";
        console.error(err)
    }
}

function displayMoreImages() {
    for (let i = imageCounter; i < Math.min(5000,imageCounter + IMAGES_INCREMENT); i++) {
        let imgEtTitreDiv = document.createElement('div')
        let img = document.createElement('img')
        img.src = images[i].thumbnailUrl
        let titre = document.createElement('h6')
        titre.innerText = images[i].id + ". " + images[i].title
        imgEtTitreDiv.appendChild(img)
        imgEtTitreDiv.appendChild(titre)
        galleryDiv.appendChild(imgEtTitreDiv)
    }
    if (imageCounter >= 5000) {
        alert('no more images!')
    } else {
        imageCounter += IMAGES_INCREMENT;
        photoCounterDiv.innerHTML = `Showing ${imageCounter} of ${images.length} photos`
    }
}

window.onload = async (event) => {
    try {        
        await getPhotos()
    } catch (err) {
        galleryDiv.innerHTML = "Sorry failed to fetch photos."
        console.error(err)
    }
}