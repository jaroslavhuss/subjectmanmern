import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminContainer from '../../admin-components/AdminContainer';
const AdminSubjectUpdate = () => {

    const globalSubject = useSelector((data) => {
        //@ts-ignore
        return data.updateSubject.subjectToBeUpdated;
    })
    const [subjectToUpdate, setSubjectToUpdate] = useState<any>(globalSubject);
    useEffect(() => {
        setSubjectToUpdate(globalSubject)
    }, []);

    return (
        <AdminContainer>



            <div className="object-change">
                <p>Credits {subjectToUpdate.credits}</p>
                <input value={subjectToUpdate.credits} onChange={(e: any) => {
                    setSubjectToUpdate({ ...subjectToUpdate, credits: e.target.value })
                }} />
            </div>
            <div className="object-change">
                <p>Degree: {subjectToUpdate.degree}</p>
                <select onChange={(e) => {
                    setSubjectToUpdate({ ...subjectToUpdate, degree: e.target.value })
                }}>
                    {subjectToUpdate.degree === "Bc." &&
                        <>
                            <option value={subjectToUpdate.degree}>{subjectToUpdate.degree}</option>
                            <option value="Ing.">Ing.</option>
                        </>
                    }
                    {subjectToUpdate.degree === "Ing." &&
                        <>
                            <option value={subjectToUpdate.degree}>{subjectToUpdate.degree}</option>
                            <option value="Bc.">Bc.</option>
                        </>
                    }
                </select>
            </div>
        </AdminContainer>
    );
};

export default AdminSubjectUpdate;
