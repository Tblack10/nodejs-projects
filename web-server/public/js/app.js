const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

weatherForm.addEventListener('submit', (e) => {
    //Prevents Refresh =)
    e.preventDefault()

    const location = search.value
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    messageFive.textContent = ""


    fetch('/weather?address=' + location).then((response) => { 
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error + " =)"
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.temperature + ' Degrees Celsius'
                messageThree.textContent = data.summary
                messageFive.textContent = 'Daily Low: ' + data.dailyLow
                messageFour.textContent = 'Daily High: ' + data.dailyHigh
            }
        })
    })
})