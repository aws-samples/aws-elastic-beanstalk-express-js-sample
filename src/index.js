// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const { generateRandomNumber, getDate } = require('./helpers/index');

class Game {
    constructor() {
        this.id = generateRandomNumber();
        this.date = getDate();
    }
    start() {
        this.players = {
            you: 'Player 1',
            opponent: 'Player 2'
        };
    }
    getId() {
        return this.id;
    }
    stop() {
        this.players = {};
    }
}

module.exports = {
    Game
}