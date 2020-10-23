import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Navbar from "./Navbar"

import Votes from "./Votes"
import Charts from "./Charts"

import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";

axios({
    url: 'https://api.thegraph.com/subgraphs/name/daostack/alchemy',
    method: 'post',
    data: {
        query: `
 {
  avatarContracts {
    id
    address
    name
    nativeToken
    nativeReputation
    balance
    owner
  }
  contributionRewardRedeemReputations {
    id
    txHash
    contract
    avatar
    amount
    proposalId
    beneficiary
  }
}

      `
    }
}).then((result) => {
    console.log(result.data)





    let test2 = result.data.data.avatarContracts

    let test3 = result.data.data.avatarContracts
    console.log('test3')

    let nameArray = []
    let balanceArray = []

    test3.forEach(element => {
        balanceArray.push(element.balance)
        nameArray.push(element.name)
        console.log(balanceArray);
        console.log(nameArray);
    });

    // Chart test

    //////////////// Arranque //
    function init() {
        setInterval(draw, 30);
    }

    //////////////// Variáveis // Valores aqui!

    var valores = balanceArray;
    var pontos = [];
    var diferenca = [];


    function drawGrid(width, height, colun, line) {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        for (var c = 1; c < (width / colun); c++) {
            ctx.beginPath();
            ctx.moveTo(c * colun, 0);
            ctx.lineTo(c * colun, height);
            ctx.stroke();
        }
        for (var l = 1; l < (height / line); l++) {
            ctx.beginPath();
            ctx.moveTo(0, l * line);
            ctx.lineTo(width, l * line);
            ctx.stroke();
        }
    }

    function drawingLines(width, points, c) {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.beginPath();
        ctx.globalAlpha = c * 0.04;
        ctx.moveTo(((c - 1) * width + 10), points[c - 1]);
        ctx.lineTo(c * width + 10, points[c]);
        ctx.lineTo(c * width + 10, 300);
        ctx.lineTo(((c - 1) * width + 10), 300);
        ctx.lineTo(((c - 1) * width + 10), points[c - 1]);
        ctx.fill();
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.moveTo(((c - 1) * width + 10), points[c - 1]);
        ctx.lineTo(c * width + 10, points[c]);
        ctx.stroke();
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.arc(c * width + 10, points[c], 3, 0, Math.PI * 2)
        ctx.fill();
        ctx.restore();
    }


    function draw() {
        var ctx = document.getElementById('canvas').getContext('2d');

        //////////////// setupBackground
        ctx.fillStyle = "#1d1f20";
        ctx.strokeStyle = "#333";
        ctx.save();
        drawGrid(500, 300, 10, 10);


        for (var c = 0; c < valores.length; c++) {
            if (isNaN(pontos[c])) {
                pontos[c] = 300;
            }
            ctx.lineWidth = 1.4;
            let larg = 480 / (valores.length - 1);
            diferenca[c] = (300 - valores[c]) - pontos[c];
            pontos[c] += diferenca[c] / (c + 1);

            //////////////// setupGraphic
            ctx.strokeStyle = "#0ff";
            ctx.fillStyle = "#0ff";
            drawingLines(larg, pontos, c);
        }
    }
    window.onload = init();







    // Chart test

    let testArray = []

    test2.forEach(element => {
        testArray.push(element)
        console.log(element);
    });





    var col = [];
    for (var i = 0; i < testArray.length; i++) {
        for (var key in testArray[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");

    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < testArray.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = testArray[i][col[j]];
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);




});




function App() {



    return ( <
        div className = "App" >
        <
        Navbar / >

        <
        canvas id = "canvas"
        width = "500"
        height = "300" / >



        <
        p id = "showData" > < /p>

        <
        /
        div >
    );
}

export default App;