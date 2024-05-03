//PROBLEM 2
class Lease {
    constructor(leaser, leaseDate, leaseKmDriven) {
        this.leaser = leaser
        this.leaseDate = leaseDate
        this.leaseKmDriven = leaseKmDriven
    }
}

class Car {
    constructor(carMake, carModel, isCarTaken = false, totalDistanceDriven = 0, leases = []) {
        this.carMake = carMake
        this.carModel = carModel
        this.isCarTaken = isCarTaken
        this.totalDistanceDriven = totalDistanceDriven
        this.leases = leases
    }

    sumTotalDistance() {
        return this.leases.reduce((sum, lease) => sum + lease.leaseKmDriven, 0)
    }

    addLease(lease) {
        this.leases.push(lease)
        this.totalDistanceDriven += lease.leaseKmDriven
    }
    
    addNewLease(leaser, leaseDate, leaseKmDriven) {
        let newLease = new Lease(leaser, leaseDate, leaseKmDriven)
        this.addLease(newLease)
    }
}

class CompanyCars {
    constructor() {
        this.cars = []
    }

    addCar(car) {
        this.cars.push(car)
    }

    getCarWithMostDistanceDriven() {
        if (this.cars.length === 0) return null

        let maxDistanceCar = this.cars[0]
        for (let i = 1; i < this.cars.length; i++) {
            if (this.cars[i].totalDistanceDriven > maxDistanceCar.totalDistanceDriven) {
                maxDistanceCar = this.cars[i]
            }
        }
        return maxDistanceCar
    }

    printAvailableCars() {
        const availableCars = this.cars.filter(car => !car.isCarTaken);
        if (availableCars.length === 0) {
            console.log("All cars are currently taken.");
            alert("All cars are currently taken.");
        } else {
            const availableCarsArray = availableCars.map(car => `${car.carMake} ${car.carModel}`);
            const availableCarsString = availableCarsArray.join(", ");
            console.log(`Available cars: ${availableCarsString}`);
            alert(`Available cars: ${availableCarsString}`);
        }
    }

    addLeaseToCar(carMake, carModel, lease) {
        const carIndex = this.cars.findIndex(car => car.carMake === carMake && car.carModel === carModel)
        if (carIndex !== -1) {
            this.cars[carIndex].addLease(lease)
            console.log(`Lease added to ${carMake} ${carModel}.`)
            alert(`Lease added to ${carMake} ${carModel}.`)
        } else {
            console.log(`Car ${carMake} ${carModel} not found.`)
            alert(`Car ${carMake} ${carModel} not found.`)
        }
    }
}

//Sample values for testing
const broLease = new Lease("Bro", "2024-4-20", 60000)
const manLease = new Lease("Man", "2024-4-21", 9420)
const mustang = new Car("Ford", "Mustang", false, 69420, [
    broLease,
    manLease
])

const corolla = new Car("Toyota", "Corolla", false, 6969, [])

let createdCars = [mustang, corolla]

const companyCars = new CompanyCars()

let newLease = null

let divReference = null

function addCustomLease() {
    
    let leaserName = prompt("Enter your name: ")
    let leaseDate = prompt("Enter lease date in YYYY-MM-DD format:")
    let distanceDriven = parseInt(prompt("Enter distance driven: "))
    if (leaserName == "" || leaseDate == "" || isNaN(distanceDriven)){
        alert("Invalid input")
        return
    }

    newLease = new Lease(leaserName, leaseDate, distanceDriven)
    if (divReference) {
        divReference.querySelector("#lease-info").textContent = `Leaser: ${newLease.leaser}, Lease Date: ${newLease.leaseDate}, Kilometers Driven: ${newLease.leaseKmDriven}`
    } else {
        const container = document.querySelector("#container")
        const div = document.createElement("div")
        div.id = "createdDiv"
        
        const leaseInfo = document.createElement("p")
        leaseInfo.id = "lease-info"
        leaseInfo.textContent = `Leaser: ${newLease.leaser}, Lease Date: ${newLease.leaseDate}, Kilometers Driven: ${newLease.leaseKmDriven}`
    
        const removeButton = document.createElement("button")
        removeButton.id = "removeButton"
        removeButton.textContent = "Remove"
        removeButton.onclick = () => {
            if (div) {
                div.remove()
                removeButton.remove()
            }
        }
    
        div.appendChild(leaseInfo)
        div.appendChild(removeButton)
        container.appendChild(div)
        divReference = div
    }
}

function createNewCar() {
    const carMake = prompt("Enter car make:");
    const carModel = prompt("Enter car model:");
    
    if (!carMake || !carModel) {
        alert("Invalid input. Car not added.");
        return;
    }
    
    const newCar = new Car(carMake, carModel);
    createdCars.push(newCar);
    
    alert(`New car added: ${carMake} ${carModel}`);
}
    
function sumKm(){
    const carModelInput = prompt("Enter car model name: ")
    if (!carModelInput){
        return
    }  
    const carIndex = createdCars.findIndex(car => car.carModel === carModelInput)
    if (carIndex !== -1){
        alert(`Total Kilometers on ${createdCars[carIndex].carModel}: ${createdCars[carIndex].sumTotalDistance()}`)
    }else {
    alert("Car not found.")
    }
}    
    
function addLeaseToCar(){
    debugger
    const carModelInput = prompt("Enter car model name: ")
    if (!carModelInput){
        return
    }  
    if (!newLease){
        alert("Please create a lease with the הוסף נסיעה חדשה button.")
        return
    }
    const carIndex = createdCars.findIndex(car => car.carModel === carModelInput)
    const leaser = newLease.leaser
    const leaseDate = newLease.leaseDate
    const leaseKmDriven = newLease.leaseKmDriven
    createdCars[carIndex].addNewLease(leaser, leaseDate, leaseKmDriven)
    alert(`Lease added to ${createdCars[carIndex].carModel}`)
}    
    

function addCompanyCar(){
    const carModelInput = prompt("Enter car model name:")
    if (!carModelInput){
        return
    }  
    const carIndex = companyCars.cars.findIndex(car => car.carModel === carModelInput)
    if (carIndex){
        alert(`${companyCars.cars[carIndex].carModel}: is already a company car.`)
        return
    } else if(carIndex !== -1) {
        
        return
    }
    companyCars.addCar(mustang)
    alert(`${mustang.carModel} was added to the company car list.`)
}
    

function findMostDistanceCar(){
    const mostDistanceCar = companyCars.getCarWithMostDistanceDriven()
    alert(`Car with most distance driven: ${mostDistanceCar.carMake + " " + mostDistanceCar.carModel}, with ${mostDistanceCar.totalDistanceDriven}km driven.`)
}

function allAvailableCars(){
        companyCars.printAvailableCars()
}
