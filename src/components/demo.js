/**
 * Created by Adrian on 02-Sep-18.
 */

import React from "react";
import Unity, {UnityContent} from "react-unity-webgl";
import "../assets/js/UnityFiles/Build/UnityLoader.js";

export default class Demo extends React.Component {

    constructor(props) {

        super(props);
        this.unityContent = new UnityContent(
            "../assets/js/UnityFiles/Build/devbuild.json",
            "../assets/js/UnityFiles/Build/UnityLoader.js"
        );

    }

    render() {


        //TODO:Replace the unity build with the devbuild
        return (<Unity unityContent={this.unityContent}/>)

    }

}