import { useEffect, useState, Fragment } from 'react'
import { Grades } from '../../types/studentTypes'
import { courseUnit, gwaStatus } from '../../utils/gwaStatus'
import useFetch from '../../hooks/useFetch'
import useUserStore from '../../store/useUserStore'
import yearSuffix from '../../utils/yearSuffix'

import PageContainer from '../../components/shared/components/PageContainer'
import GwaTableRow from '../../components/shared/components/GwaTableRow'

const GWAStatus = () => {

    const { userInfo } = useUserStore();
    const [records, setRecords] = useState<Grades[]>([]);
    const [gwaList, setGwaList] = useState<number[]>([]);
    const { data } = useFetch('grade/get-grades', 'GET');
    
    //GWA
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setRecords(data as Grades[]);
        }
        
        let gwaArray = [];
        for(let i = 0; i < records.length; i += 5) {

            let totalUnits= 0;
            let weightedSum = 0;
            let gwa = 0;

            for(let j = i; j < i + 5 && j < records.length; j++) {
                weightedSum += Number(records[j].grade) * (courseUnit(userInfo, records, j) || 0);
                if(records[j]) {
                    totalUnits += courseUnit(userInfo, records, j) || 0;
                }
            }
            gwa = weightedSum / totalUnits;
            gwaArray.push(parseFloat(gwa.toFixed(1)));
        }
        setGwaList(gwaArray);
    }, [data]);


    //Year
    let studentId = userInfo?.studentId;
    let studIdArray = studentId?.split("-");
    let year = 0;
    if(studIdArray) {
        year = parseInt(studIdArray[0]);
    }
    let yearTaken = 0;
    

    const gwaTableRow = (gwa: number, i: number) => {
        //Sem
        let sem = 1;
        if(i % 2 === 0) {
            yearTaken = year;
            year++;
            sem = 1;
        } else sem = 2;
        let semester = sem + yearSuffix(sem);


        //Status
        let status = gwaStatus(gwa);

        return <GwaTableRow sem={semester} year={yearTaken} gwa={gwa} status={status}/>
    }

    return (
        <PageContainer>
            <div className='bg-re-200 h-[100%] pt-[10rem]'>
                <table className='bg-cya-100 border-separate border-spacing-x-[6rem]'>
                    <thead className=''>
                        <tr className='text-[1.1rem]'>
                            <th>Semester</th>
                            <th>GWA</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {gwaList.map((g, i) => {
                            if(g !== 0) {
                                return (
                                    <Fragment key={i}>
                                        {i % 2 === 0 && 
                                        <tr className="">
                                            <td className="px-4 py-2" colSpan={3}></td>
                                        </tr>}
                                        {gwaTableRow(g, i)}
                                    </Fragment>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </PageContainer>
    )
}

export default GWAStatus