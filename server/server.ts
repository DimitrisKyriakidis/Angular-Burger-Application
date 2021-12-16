

import * as express from 'express';
import {Application} from "express";
import {getAllBurgers,  getCourseByUrl} from "./get-courses.route";
//import {searchLessons} from "./search-lessons.route";
import {loginUser} from "./auth.route";
import {saveCourse} from "./save-course.route";
import {createCourse} from './create-course.route';
import {deleteCourse} from './delete-course.route';
import { editBurger } from './edit-burger.route';

const bodyParser = require('body-parser');



const app: Application = express();


app.use(bodyParser.json());


app.route('/api/login').post(loginUser);

app.route('/api/burgers').get(getAllBurgers);

app.route('/api/burger').post(createCourse);

app.route('/api/burger').post(saveCourse);

app.route('/api/editburger/:id').put(editBurger);

app.route('/api/course/:id').delete(deleteCourse);

app.route('/api/courses/:courseUrl').get(getCourseByUrl);






const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




