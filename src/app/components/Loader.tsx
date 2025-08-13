import { ClipLoader } from 'react-spinners';

const Loader = ({ loading = true, color = 'blue', size = 50 }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <ClipLoader color={color} loading={loading} size={size} />
  </div>
);
export default Loader;
