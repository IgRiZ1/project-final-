import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const userInput = readline.createInterface({ input, output });

// Prix et taux de TVA des articles
let prijzen = {
    Wijn: 10,
    Bier: 2,
    Fruitsap: 3
};

let btwTarieven = {
    Wijn: 21,
    Bier: 6,
    Fruitsap: 12
};

let mand = [];

async function vraagMandGrootte() {
    let grootte;
    while (true) {
        let input = await userInput.question('Hoe groot is de mand (3 - 20)? ');
        grootte = parseInt(input);
        if (grootte >= 3 && grootte <= 20) {
            break; 
        } else {
            console.log('Foutieve grootte. Probeer opnieuw.');
        }
    }
    await vulMand(grootte);
}

async function vulMand(grootte) {
    for (let i = 0; i < grootte; i++) {
        let keuze;
        while (true) {
            let input = await userInput.question('Kies geschenk (W,B,F): ');
            if (input.toUpperCase() === 'W') {
                keuze = 'Wijn';
                break;
            } else if (input.toUpperCase() === 'B') {
                keuze = 'Bier';
                break;
            } else if (input.toUpperCase() === 'F') {
                keuze = 'Fruitsap';
                break;
            } else {
                console.log('Foutieve invoer. Probeer opnieuw.');
            }
        }
        mand.push(keuze);
    }

    console.log('Mand gevuld: ', mand);
    let totaal = berekenTotaal();
    console.log(`Totaal zonder btw: ${totaal} Euro`);

    let totaalBTW = berekenTotaalBTW();
    console.log(`Totaal met btw: ${totaalBTW} Euro`);

    userInput.close();
}

function berekenTotaal() {
    let totaal = 0;
    for (let item of mand) {
        totaal += prijzen[item];
    }
    return totaal;
}


function berekenTotaalBTW() {
    let totaal = 0;
    for (let item of mand) {
        totaal += prijzen[item] * (1 + btwTarieven[item] / 100);
    }
    return totaal.toFixed(2); 
}

vraagMandGrootte();
