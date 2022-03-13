import { File } from "../types/File";
import { connection as db } from '../database';
import { OkPacket, RowDataPacket } from 'mysql2';


export const create =  (file: File, callback: Function) => {
    const queryString = "INSERT INTO files (name,size) VALUES (?,?)"

    db.query(queryString, [file.name, file.size], (err, result) => {
        if (err) callback(err);
        const id = (<OkPacket> result).insertId;
        callback(null, {id,...file});
    });
};


export const findById = async (id: number, callback: Function) => {
    const queryString = `SELECT * FROM files WHERE id = ?`
 
    db.query(queryString, id, (err, result) => {
        if (err) callback(err);

        const row = (<RowDataPacket>result)[0];
        callback(null, row);
    });
}

export const findByName = (name: string, callback: Function) => {

    const queryString = `SELECT * FROM files WHERE name=?`

    db.query(queryString, name, (err, result) => {
        if (err) callback(err);

        const row = (<RowDataPacket>result)[0];
        callback(null, row);
    });
}

export const find = (callback: Function) => {
    const queryString = `SELECT * FROM files`;

    db.query(queryString, (err, result) => {
        if (err) callback(err); 

        const rows = <RowDataPacket[]>result;
        callback(null, rows);
    });
}

export const deleteById = (id: number, callback: Function) => {
    const queryString = `DELETE FROM files WHERE id=?`;

    db.query(queryString, id, (err, result) => {
        if (err) callback(err);
        callback(null, result);
    });
}
