const axios = require('axios');
const fs = require('fs');

let mpTabs = [

    {
        tab: 1,
        subTabs: 15
    },
    {
        tab: 5,
        subTabs: 14
    },
    {
        tab: 10,
        subTabs: 21
    },
    {
        tab: 15,
        subTabs: 6
    },
    {
        tab: 20,
        subTabs: 4
    },
    {
        tab: 25,
        subTabs: 8
    },
    {
        tab: 30,
        subTabs: 2
    },
    {
        tab: 35,
        subTabs: 8
    },
    {
        tab: 40,
        subTabs: 10
    },
    {
        tab: 45,
        subTabs: 4
    },
    {
        tab: 50,
        subTabs: 7
    },
    {
        tab: 55,
        subTabs: 8
    },
    {
        tab: 60,
        subTabs: 8
    },
    {
        tab: 65,
        subTabs: 13
    },
    {
        tab: 70,
        subTabs: 9
    },
    {
        tab: 75,
        subTabs: 6
    },
    {
        tab: 80,
        subTabs: 9
    },
];

module.exports.getIds = async (region) => {
    let ids = [];
    console.log('STARTING SEARCH...');
    for (let i = 0; i < mpTabs.length; i++) {
        let tab = mpTabs[i];
        for (let j = 1; j <= tab.subTabs; j++) {
            let url = `https://bdo-api-helper.herokuapp.com/marketplace-clone/item-list/${tab.tab}/${j}?region=${region}`;

            let response = await axios.get(url);
            let data = response.data;
            let newIds = data.marketList.map(item => item.mainKey);

            ids = [...ids, ...newIds];
        }
    }
    console.log('DONE SEARCH!');
    console.log('WRITING TO FILE...');


    fs.writeFile(`./output/${region}.txt`, ids, (err) => {
        if (err) return console.log(err);
    });
    console.log('DONE!');
};