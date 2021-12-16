import {Request, Response} from 'express';
import {BURGERS} from './db-data';

export var coursesKeyCounter = 100;

export function createCourse(req: Request, res: Response) {

    console.log("Creating new burger  ...");

    const changes = req.body;

    const newBurger = {
        id: coursesKeyCounter,
      iconUrl: coursesKeyCounter,
      description:coursesKeyCounter,
      category:coursesKeyCounter,
        ...changes
    };

    BURGERS[newBurger.id] = newBurger;

  coursesKeyCounter += 1;

    setTimeout(() => {

      res.status(200).json(newBurger);

    }, 2000);

}

