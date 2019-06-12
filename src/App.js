import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Switch} from "react-router";
import Homepage from "./components/homepage";
import MapContainer from "./components/map";
import Credits from "./components/Credits"
import Test from "./components/Test"


class App extends Component {


    render() {
        return (
            <Switch>
                <Route path={"/"} component={Homepage} exact={true}/>
                <Route path={"/harta"} component={MapContainer} exact={true}/>
                <Route path={"/credite"} component={Credits} exact={true}></Route>
                <Route path={"/evaluare"} component={Test} exact={true}></Route>
            </Switch>

        );
    }
}

export default App;
