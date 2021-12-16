

import {Request, Response} from 'express';
import {BURGERS} from "./db-data";



export function getAllBurgers(req: Request, res: Response) {

    console.log("Retrieving burgers data ...");

    setTimeout(() => {

      res.status(200).json({payload:Object.values(BURGERS)});

    }, 1000);



}


export function getCourseByUrl(req: Request, res: Response) {

    const courseUrl = req.params["courseUrl"];

    const courses:any = Object.values(BURGERS);

    const course = courses.find(course => course.url == courseUrl);

    setTimeout(() => {

      res.status(200).json(course);

    }, 1000);


}
