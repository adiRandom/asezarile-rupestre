import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Switch} from "react-router";
import Homepage from "./components/homepage";
import MapContainer from "./components/map";
import Info from "./components/Info"


class App extends Component {


    render() {
        return (
            <Switch>
                <Route path={"/"} component={Homepage} exact={true}/>
                <Route path={"/harta"} component={MapContainer} exact={true}/>
                <Route path={'/info/:id'} component={Info} exact = {false}/>
            </Switch>

        );
    }
}

export default App;
