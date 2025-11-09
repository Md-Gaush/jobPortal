import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setApplications } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
       
        toast.success(res?.data?.message || 'Applicants fetched successfully');
        dispatch(setApplications(res?.data?.job));
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error fetching applicants');
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-2xl sm:text-3xl my-5">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <div className="overflow-x-auto w-full">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
