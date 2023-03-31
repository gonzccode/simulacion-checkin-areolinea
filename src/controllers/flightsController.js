const pool = require("../database/db");
const { assignSeat, separatingByTypeSeat } = require("../utils/util");

class FlightsController {
    constructor(){
        this.result = [];
    }

    getFlightsById = (id) => {
        try {
            this.result = pool.query(`SELECT * FROM flight where flight_id = ${id};`);
            
            if(this.result[0].length > 0) {
                const flight = this.result[0][0];

                const boarding = pool.query(
                    `
                    SELECT 
                    b.passenger_id as passengerId, 
                    p.dni as dni, 
                    p.name as name, 
                    p.age as age, 
                    p.country as country, 
                    b.boarding_pass_id as  boardingPassId,
                    b.purchase_id as purcharseId,
                    b.seat_type_id as seatTypeId,
                    st.name as seatTypeName,
                    b.seat_id as seatId,
                    s.seat_column as seatColumn,
                    s.seat_row as seatRow,
                    s.seat_type_id as seatType,
                    s.airplane_id as airplaneId
                    FROM boarding_pass b 
                    INNER JOIN passenger p on b.passenger_id = p.passenger_id
                    INNER JOIN seat_type st on b.seat_type_id = st.seat_type_id
                    LEFT JOIN seat s on b.seat_id = s.seat_id
                    WHERE b.flight_id = ${id}
                    ORDER BY b.purchase_id ASC;
                    `
                );
                const boardingTotal = [...boarding[0]];
                //console.log('boardingTotal', boardingTotal);

                const seats = pool.query(
                    `
                    SELECT 
                    seat_id as seatId,
                    seat_column as seatColumn,
                    seat_row as seatRow,
                    seat_type_id as seatTypeId,
                    airplane_id as airplaneId 
                    FROM seat 
                    WHERE airplane_id = ${flight.airplane_id};
                    `);
                
                //console.log(boardingTotal.filter( item => item.seatId != null).length)

                const seatsTotal = seats[0].map( seat => {
                    const newSeat = {...seat}
                    newSeat['busy'] = false
                    if(boardingTotal.filter( item => item.seatId != null).map( value => value.seatId).includes(newSeat.seatId)) {
                        newSeat['busy'] = true
                    }
                    return newSeat;
                })
                
                //console.log('seatsTotal', seatsTotal);

                const { first: firstClass  = [], second: secondClass = [], third: thirdClass = []} = separatingByTypeSeat(boardingTotal);

                const { first: seatfirstClass  = [], second: seatSecondClass = [], third: seatThirdClass = []} = separatingByTypeSeat(seatsTotal);

                const passengersFirstClass = assignSeat(firstClass, seatfirstClass);

                const passengersSecondClass = assignSeat(secondClass, seatSecondClass);

                const passengersThirdClass = assignSeat(thirdClass, seatThirdClass);

                const passengers = [...passengersFirstClass, ...passengersSecondClass, ...passengersThirdClass]


                const passengersResult = []

                for (let i = 0; i < passengers.length; i++) {
                    passengersResult.push(
                        {
                            passengerId: passengers[i].passengerId,
                            dni: passengers[i].dni,
                            name: passengers[i].name,
                            age: passengers[i].age,
                            country: passengers[i].country,
                            boardingPassId: passengers[i].boardingPassId,
                            purcharseId: passengers[i].purcharseId,
                            seatTypeId: passengers[i].seatTypeId,
                            seatId: passengers[i].seatId,

                        }  
                    )
                }
                
                flight["passengers"] = passengersResult
                return  flight;
            } else {
                return false;
            }
            

        } catch (error) {
            console.log("~❌ file: FlightsController ~ error => getFlightsById, ",error);
            return 'error';
        }
    }
}

module.exports = FlightsController;