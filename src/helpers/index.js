// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

function getDate() {
    const date = new Date();
    return date.toISOString().substr(0, 10);
}

function generateRandomNumber() {
    return Math.floor(
        Math.random() * (999 - 0)
    )
}

module.exports = {
    generateRandomNumber: generateRandomNumber,
    getDate: getDate 
}