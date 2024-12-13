
import { Grades, User } from "../types/studentTypes";
import { CourseType } from "../types/types";

//Course Unit
const courseUnit = (userInfo: User | null, records: Grades[], j: number) => {
    if(records.length > 0) {
        let programCurriculum = records[j].bsmaCurriculum?.units;

        switch(userInfo?.program.programCode) {
            case 'BSA':
                programCurriculum = records[j].bsaCurriculum?.units;
                break;
            case 'BSBA':
                programCurriculum = records[j].bsbaCurriculum?.units;
                break;
            case 'BSMA':
                programCurriculum = records[j].bsmaCurriculum?.units;
                break;
            default: programCurriculum = 0;
        };

        return programCurriculum;
   }
   return 0;
}

const computeGwa = (list: CourseType[]) => {
    let gwa = 0;
    let totalUnits= 0;
    let weightedSum = 0;

    list.forEach(item => {
        if(item.grade && item.bsaCurriculum?.units) {
            weightedSum += item.bsaCurriculum?.units * item.grade;
            totalUnits += item.bsaCurriculum.units;
        }
        if(item.grade && item.bsbaCurriculum?.units) {
            weightedSum += item.bsbaCurriculum?.units * item.grade;
            totalUnits += item.bsbaCurriculum.units;
        }
        if(item.grade && item.bsmaCurriculum?.units) {
            weightedSum += item.bsmaCurriculum?.units * item.grade;
            totalUnits += item.bsmaCurriculum.units;
        }
    });
    gwa = parseFloat((weightedSum / totalUnits).toFixed(1)) || 0;

    return gwa;
}


const gwaStatus = (gwa: number) => {
    //Status
    let status = '';
    if(gwa == 0) {
        status = ''
    }else if(gwa <= 1.2) {
        status = "President's List";
    } else if(gwa <= 1.5) {
        status = "Dean's List";
    } else if(gwa <= 2.0) {
        status = "Above Average";
    } else if(gwa <= 3.0) {
        status = "Average";
    } else status = 'Failed'

    return status;
}


export { courseUnit, gwaStatus, computeGwa };