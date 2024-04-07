import { Directories } from './context/directoryContext';
import Directory from './directory/directory.component';

const App = () => {
    return (
        <Directories>
            <Directory />;
        </Directories>
    );
};

export default App;
