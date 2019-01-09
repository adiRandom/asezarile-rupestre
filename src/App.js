import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Switch} from "react-router";
import Homepage from "./components/Homepage";
import MapContainer from "./components/map";


class App extends Component {


    render() {
        return (
            <Switch>
                <Route path={"/"} component={Homepage} exact={true}/>
                <Route path={"/harta"} component={MapContainer} exact={true}/>
            </Switch>

        );
    }
}

export default App;
