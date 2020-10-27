import React, {Component} from 'react';
import Students from "./components/Students";
import Group from "./components/Group";
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <div data-testid="app" className="App">
                <Group/>
                <Students/>
            </div>
        );
    }
}

export default App;
