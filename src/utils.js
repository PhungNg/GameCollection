import { faStepForward, faBullhorn, faFastForward, faFastBackward, faStar, faCalendarPlus, faFire, faPlusSquare, faMinusSquare, faGamepad, faCrown, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faPlaystation, faXbox, faApple, faWindows, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { db, fire } from './firebase.js'

const users = db.collection('users')

/* Funksjon som tar imot query for fetching */
export const getData = async (query) => {

    return await fetch(`https://rawg-video-games-database.p.rapidapi.com/` + query, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "685908fbf0msh9d953169c3a8c84p100cddjsne623eb4f7700"
        }
    })
        .then(response => response.json())
        .then(json => {
            return json
        })
        .catch(err => console.log(err))
}

/* Henter dato */
export const getDate = (num) => {
    let date = new Date()
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - num).toJSON().slice(0, 10)
    return newDate
}
/* Utvalgte platformer */
export const inList = (platform, id) => {
    let platforms = ['PC', 'Xbox', 'iOS', 'Android', 'Nintendo', 'PlayStation']
    if (platforms.includes(platform)) return true
}
/* Ikoner for utvalgte platformer */
export const getIcon = (e) => {
    switch (e) {
        case 'PC':
            return faWindows
            break;
        case 'Xbox':
            return faXbox
            break;
        case 'iOS':
            return faApple
            break;
        case 'Android':
            return faAndroid
            break;
        case 'Nintendo':
            return faGamepad
            break;
        default:
            return faPlaystation
    }
}
/* Sjekker om spillet ligger i wishlist */
export const checkIfExists = (usersWishlist, id) => {
    let exists = false

    usersWishlist.map((game) => {

        if (game.id == id) {
            return exists = true
        }
    })
    return exists
}
export const toggleHeartIcon = (usersWishlist, uid, obj, e) => {
    if (checkIfExists(usersWishlist, obj.id)) {
        users.doc(uid).update({
            wishlist: fire.firestore.FieldValue.arrayRemove(obj)
        })
    } else {
        users.doc(uid).update({
            wishlist: fire.firestore.FieldValue.arrayUnion(obj)
        })
    }
    e.target.classList.toggle('fill')

}

