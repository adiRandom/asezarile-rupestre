import React, {Component} from "react";
import background from "./assets/img/background.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Switch} from "react-router";
import Homepage from "./components/homepage";
import MapContainer from "./components/map";


class App extends Component {

    constructor() {

        super();

        document.getElementsByTagName("body")[0].style.backgroundImage = `url(${background})`;


    }

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
