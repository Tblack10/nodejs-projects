const socket = io()

//HTML Elements, $ is a convention for DOM Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#locationMessage-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML


//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoScroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    
    // Visible Height
    const visibleHeight = $messages.offsetHeight

    // Height of Messages Container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        // If you want to scroll down regardless of where the user is you just need this
        $messages.scrollTop =$messages.scrollHeight
    }
 
}

socket.on('sendMessage', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('locationMessage', (location) => {
    console.log(location)
    const html = Mustache.render(locationTemplate, {
        username: location.username,
        location: location.url,
        createdAt: moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // e.target to get the form, elements.message to get the 'name'
    const messageToSend = e.target.elements.message.value
    
    socket.emit('sendMessage', messageToSend, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log("Message Delivered!")
    })
})

$sendLocationButton.addEventListener('click', () => {
   
    if (!navigator.geolocation) {
        return alert('GeoLocation is not supported by your browser')
    } 

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log("Location Shared")
            $sendLocationButton.removeAttribute('disabled')
        })  
    }) 
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

// socket.on('sendMessage', (message) => {
//     console.log(message)
// })



