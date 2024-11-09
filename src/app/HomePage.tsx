import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <p className='text-3xl'>
      <Link to='/demo'>Demo pages</Link>
    </p>
  );
}
