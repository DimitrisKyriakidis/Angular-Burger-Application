import {Request, Response} from 'express';
import {BURGERS} from "./db-data";


export function deleteCourse(req: Request, res: Response) {

    console.log("Delete Burger ...");

    const id = req.params["id"];

    const burger = BURGERS[id];
   console.log('burger==',burger);
   
    delete BURGERS[id];

    setTimeout(() => {

      res.status(200).json({id});

    }, 1000);

}

