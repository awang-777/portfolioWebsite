import { useOutletContext } from 'react-router-dom';
import Typewriter from '../../components/Typewriter';

// Project page title, typed out once the page loader lifts
function ProjectTitle({ children }) {
  const { revealed } = useOutletContext();
  return <Typewriter text={children} start={revealed} className="project-title" />;
}

export default ProjectTitle;
