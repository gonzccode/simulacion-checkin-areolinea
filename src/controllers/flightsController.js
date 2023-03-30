const pool = require("../database/db");

class FlightsController {
    constructor(){
        this.result = [];
    }

    getFlights = async () => {
        try {
            this.result = await pool.query('SELECT * FROM flight;');
            return  this.result[0];

        } catch (error) {
            console.log("~❌ file: FlightsController ~ error => getFlights, ",error);
        }
    }

    getFlightsById = async (id) => {
        try {
            this.result = await pool.query(`SELECT * FROM flight where flight_id = ${id};`);
            const boarding = await pool.query(`SELECT * FROM boarding_pass where flight_id = ${id};`);
            console.log('boarding', boarding[0])
            if(this.result[0].length > 0) {
                const flight = this.result[0][0];
                return  flight;
            } else {
                return false
            }
            

        } catch (error) {
            console.log("~❌ file: FlightsController ~ error => getFlights, ",error);
            return 'error'
        }
    }
}

module.exports = FlightsController;