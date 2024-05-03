//*PROBLEM 1* 
//I want to allow just one div to exist, replacing the text of the current div if user clicks button multiple times
let divReference = null
function addNameDiv() {
    const fullName = prompt("Please enter your full name: ").split(" ")
    
    //Check for valid input
    if(!fullName || fullName === ""){
        alert("Invalid input")
        return
    }
    const firstName = fullName[0]
    
    //In case of multiple last names
    //Only tolerate input that conatins first and last name seperated by space
    const lastName = fullName.slice(1).join(" ")
    if(!lastName){
        alert("Invalid input")
        return
    
    }
    //Check if div already exists, replacing text if it does
    if (divReference) {
        divReference.querySelector("#firstName").textContent = firstName
        divReference.querySelector("#lastName").textContent = lastName
    //If div doesn't exist, create the div
    } else {
        const container = document.querySelector("#container")
        const div = document.createElement("div")
        div.id = "createdDiv"
        const firstNamePara = document.createElement("p")
        firstNamePara.id = "firstName"
        firstNamePara.textContent = firstName

        const lastNamePara = document.createElement("p")
        lastNamePara.id = "lastName"
        lastNamePara.textContent = lastName

        div.appendChild(firstNamePara)
        div.appendChild(lastNamePara)

        //Add a button to remove the div from the page
        const removeButton = document.createElement("button")
        removeButton.id = "removeButton"
        removeButton.textContent = "Remove"
        removeButton.onclick = () => {
            if (div) {
                div.remove()
                divReference = null
                removeButton.remove()
            }
        }
        //Add div to container and set the reference to the created div
        container.appendChild(div)
        div.appendChild(removeButton)
        divReference = div
    }
}

