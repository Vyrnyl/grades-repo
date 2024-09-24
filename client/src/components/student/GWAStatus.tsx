import React from 'react'
import PageContainer from '../shared/components/PageContainer'
import GwaTableRow from '../shared/components/GwaTableRow'

const GWAStatus = () => {
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
                    <tr className="">
                        <td className="px-4 py-2" colSpan={3}></td>
                    </tr>
                    <GwaTableRow sem='1st' year={2023} gwa={1.6} status='Above Average'/>
                    <GwaTableRow sem='2nd' year={2023} gwa={1.4} status="Dean's List"/>
                    <tr className="">
                        <td className="px-4 py-2" colSpan={3}></td>
                    </tr>
                    <GwaTableRow sem='1st' year={2023} gwa={1.2} status="President's List"/>
                    <GwaTableRow sem='2nd' year={2023} gwa={2.2} status="Average"/>
                </tbody>
            </table>
        </div>
    </PageContainer>
  )
}

export default GWAStatus