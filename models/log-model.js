const db = require('./conn-model');

class Logs {
    constructor(id, dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id) {
        this.id = id;
        this.dateapplied = dateapplied;
        this.opperator = opperator;
        this.holestreated = holestreated;
        this.area = area;
        this.settings = settings;
        this.totalgallons = totalgallons;
        this.sprayrig = sprayrig;
        this.notes = notes;
        this.log_user_id = log_user_id;
        }

    static async getAll() {
        try {
            const response = await db.any(`select * from log LEFT JOIN users ON log.log_user_id = users.id`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getById(id) {
        try {
            const response = await db.one(`select * from log LEFT JOIN users ON log.log_user_id=users.id where log.id=${id}`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getByUserId(user_id) {
        try {
            const response = await db.any(`select * from log where log_user_id='${user_id}'`);
            console.log('this is the log-models page UserId: ', user_id)
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async deleteLog(log_id) {
        try {
            const response = await db.result(`delete from log where id = ${log_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addLog(dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id) {
        const query = `insert into log
        (dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id)
    Values ('${dateapplied}', '${opperator}','${holestreated}', '${area}', '${settings}', '${totalgallons}', '${sprayrig}', '${notes}', ${log_user_id} )`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log ('Error', err.message);
            return err;
        }
    }


    static async updateLog(logId, dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id) {
        const query = `
            UPDATE log
            SET 
                dateapplied = '${dateapplied}', 
                opperator = '${opperator}', 
                holestreated = '${holestreated}', 
                area = '${area}', 
                settings = '${settings}', 
                totalgallons = '${totalgallons}',
                sprayrig = '${sprayrig}',
                notes = '${notes}',
                log_user_id = ${log_user_id}
            WHERE 
                id = '${logId}'`;
        console.log(query);
        try {
            const response = await db.result(query);
            console.log("response", response);
            return response;
        } catch (err) {
            return err.message;
        }
    }
}
module.exports = Logs;

