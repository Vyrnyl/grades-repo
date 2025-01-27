"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programController_1 = require("../controllers/programController");
const router = (0, express_1.Router)();
router.get('/get-programs', programController_1.getPrograms);
router.get('/get-courses', programController_1.getCourses);
router.post('/add-added-course', programController_1.addCourse);
router.get('/get-added-courses', programController_1.getAddedCourse);
router.put('/update-added-course', programController_1.updateCourse);
router.delete('/delete-added-course', programController_1.deleteCourse);
router.post('/add-assigned-courses', programController_1.assignCourses);
router.post('/get-assigned-courses', programController_1.getStudentCourses);
router.get('/get-all-assigned-courses', programController_1.getAllStudentCourses);
router.put('/update-assigned-courses', programController_1.updateStudentCourses);
exports.default = router;
