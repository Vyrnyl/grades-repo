
import { Grades, User } from "../types/studentTypes";

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


const gwaStatus = (gwa: number) => {
    //Status
    let status = '';
    if(gwa <= 1.2) {
        status = "President's List";
    } else if(gwa <= 1.5) {
        status = "Dean's List";
    } else if(gwa <= 2.0) {
        status = "Above Average";
    } else if(gwa <= 3.0) {
        status = "Average";
    }

    return status;
}


export { courseUnit, gwaStatus };