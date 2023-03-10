import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import Footer from '../components/Footer';
export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
    <div>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='view btn-sm w-20 d-inline ms-auto'>
            Back
          </Link>

          <h1 className='project-title'>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='project-title'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <EditProjectForm project={data.project}/>
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
      </div>
      <br />
      <br />
      <div>
      <Footer />
      </div>
    </>
  );
}
