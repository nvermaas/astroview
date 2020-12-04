import React, {useState, useEffect }  from 'react';
import { Button } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';

import { parseString } from 'xml2js'
// https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
// https://stackoverflow.com/questions/61912232/how-to-wrap-vanilla-javascript-functions-to-reactjs-without-major-modifications

export default function SampPage(props) {

    const pingFunc = function(connection) {
        connection.notifyAll([new window.samp.Message("samp.app.ping", {})])
    }

    const register = () => {
        connector.register()
    }
    const unregister = () => {
        connector.unregister()
    }
    const handlePing = () => {
        connector.runWithConnection(pingFunc)
    }

    const [ my_state, my_dispatch] = useGlobalReducer()


    var cc = new window.samp.ClientTracker();
    var callHandler = cc.callHandler;

    callHandler["samp.app.ping"] = function(senderId, message, isCall) {
        alert('callHandler samp.app.ping')
        if (isCall) {
            return {text: "ping to you, " + cc.getName(senderId)};
        }
    };

    callHandler["table.load.votable"] = function(senderId, message, isCall) {
        var params = message["samp.params"];
        var origUrl = params["url"];
        var proxyUrl = cc.connection.translateUrl(origUrl);
        var xhr = window.samp.XmlRpcClient.createXHR();
        var e;
        //alert('callHandler table.load.votable')

        var e;
        var xhr = window.samp.XmlRpcClient.createXHR();
        xhr.open("GET", proxyUrl);
        xhr.onload = function() {
            var xml = xhr.responseXML;
            if (xml) {
                try {
                    let tableId = params["table-id"];
                    alert(tableId)
                    let tableUrl = origUrl;
                }
                catch (e) {
                    alert("Error displaying table:\n" +
                        e.toString());
                }
            }
            else {
                alert("No XML response");
            }
        };
        xhr.onerror = function(err) {
            alert("Error getting table " + origUrl + "\n" +
                "(" + err + ")");
        };
        xhr.send(null);
    };

    var subs = cc.calculateSubscriptions();
    var connector = new window.samp.Connector("astroview", {"samp.name": "AstroView"}, cc, subs)

    return (
        <div className="App">
            <div>
                <h2>SAMP</h2>
                <Button variant="outline-warning" onClick={() => register()}>register</Button>
                <Button variant="outline-success" onClick={() => handlePing()}>SAMP Ping</Button>
                <Button variant="outline-warning" onClick={() => unregister()}>unregister</Button>

            </div>
        </div>
    );
}