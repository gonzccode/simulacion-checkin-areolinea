const assignSeat = (passengers = [], seats = []) => {
    
    const passengersWithSeat = []
    const passengersWithoutSeat = []

    const seatColumnTotal = [... new Set(seats.map( seat => seat.seatColumn))]
    const seatRowTotal = [... new Set(seats.map( seat => seat.seatRow))]

    for (let i = 0; i < passengers.length; i++){
        if(passengers[i].seatId == null) {
            passengersWithoutSeat.push(passengers[i])
        } else {
            passengersWithSeat.push(passengers[i])
        }
    }

    let passengersTotal = []

    for (let i = 0; i < passengersWithSeat.length; i++ ){
        const passengersByPurchaseId = passengers.filter(passenger => passenger.purcharseId == passengersWithSeat[0].purcharseId);
        
        if (passengersByPurchaseId.length > 1) {
            const passenger = passengersByPurchaseId.filter( pass => pass.seatId != null)
            const passengerYounger = passengersByPurchaseId.filter( pass => pass.age < 18)

            for(let j = 0; j < passengersByPurchaseId.length; j++){
                if(passengersByPurchaseId[j].seatId == null) {
                    const indexColumn = seatColumnTotal.findIndex(seat => seat == passenger[0].seatColumn)
                    if( indexColumn + 1 < seatColumnTotal.length ){
                        if( 0 <= indexColumn - 1) {
                            const indexSeatDown = seats.findIndex(seat => 
                                seat.seatColumn == seatColumnTotal[indexColumn - 1] &&  
                                seat.seatRow == passenger[0].seatRow && seat.airplaneId == passenger[0].airplaneId)
                            const indexSeatUp = seats.findIndex(seat => 
                                seat.seatColumn == seatColumnTotal[indexColumn + 1] &&  
                                seat.seatRow == passenger[0].seatRow && seat.airplaneId == passenger[0].airplaneId)
                            if(seats[indexSeatDown].busy == false){
                                passengersByPurchaseId[j].seatId = indexSeatDown
                                passengersByPurchaseId[j].seatColumn = seatColumnTotal[indexColumn - 1]
                                passengersByPurchaseId[j].seatRow = passenger[0].seatRow
                                seats[indexSeatDown].busy = true
                            } else {
                                passengersByPurchaseId[j].seatId = indexSeatUp
                                passengersByPurchaseId[j].seatColumn = seatColumnTotal[indexColumn + 1]
                                passengersByPurchaseId[j].seatRow = passenger[0].seatRow
                                seats[indexSeatDown].busy = true
                            }
                        }
                    
                    }
                }
            }
        }
        passengersTotal = [...passengersWithSeat, ...passengersWithoutSeat ,...passengersByPurchaseId]
   
    }

    return passengersTotal;
}

const separatingByTypeSeat = (arrayTotal = []) => {
    const first = []
    const second = []
    const third = []

    for(let i = 0; i < arrayTotal.length; i++) {
        if(arrayTotal[i].seatTypeId == 1) {
            first.push(arrayTotal[i])
        } else if (arrayTotal[i].seatTypeId == 2){
            second.push(arrayTotal[i])
        } else if (arrayTotal[i].seatTypeId == 3){
            third.push(arrayTotal[i])
        }
    }

    return {first, second, third};
}

module.exports = {assignSeat, separatingByTypeSeat };