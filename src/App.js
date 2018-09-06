import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Switch} from "react-router";
import Homepage from "./components/homepage";
import MapContainer from "./components/mapContainer";


class App extends Component {


    render() {
        return (
            <Switch>
                <Route path={"/"} component={Homepage} exact={true}/>
                <Route path={"/map"} component={MapContainer} exact={true}/>
            </Switch>

        );
    }
}

export default App;
