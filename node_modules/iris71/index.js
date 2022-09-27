#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playerName; // name of the player

const sleep = function(ms=2000){
    return new Promise(function(r){
        setTimeout(r,ms)
    })       
}

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to Iris71, a Javscript game on your command line! \n'
    );
    await sleep();
    rainbowTitle.stop();
    console.log(`
      ${chalk.bgBlue('HOW TO PLAY')}
      I am a process on your computer.
      If you get a question wrong I will be ${chalk.bgRed('killed')}
      No pressure...
    `);
}



async function askName(){
    const answers = await inquirer.prompt({
        name:'player_name',
        type: 'input',
        message: 'What is your Name?',
        default(){
            return 'Player';
        },   
    });
    playerName = answers.player_name;
}
async function question1(){
    const answers = await inquirer.prompt({
        name:'answer',
        type: 'list',
        message: 'Somehow JS was built in 10 days, it was then released on\n',
        choices:[
            'Dec 4th, 1995',
            'Nov 15th, 1996',
            'March 3rd, 1995',
            'Jan 18th, 1996',
        ],
           
    });
    return handleAnswer(answers.answer == 'Dec 4th, 1995');
}

async function question2(){
    const answers = await inquirer.prompt({
        name:'answer',
        type: 'list',
        message: 'How many primitve types are there in Javascript',
        choices:[
            '5',
            '8',
            '7',
            '9',
        ],
           
    });
    return handleAnswer(answers.answer == '7');
}
async function question3(){
    const answers = await inquirer.prompt({
        name:'answer',
        type: 'list',
        message: '_____ is a syntactic superset of javascript which adds static typing. It was developed at Microsoft',
        choices:[
            'React',
            'Node.js',
            'TypeScript',
            'C#',
        ],
           
    });
    return handleAnswer(answers.answer == 'TypeScript');
}

async function question4(){
    const answers = await inquirer.prompt({
        name:'answer_1',
        type: 'list',
        message: 'Which of the following is not a Javascript framework?',
        choices:[
            'AngularJS',
            'Node.js',
            'React.js',
            'Next.js',
        ],
           
    });
    return handleAnswer(answers.answer_1 == 'React.js');
}

async function handleAnswer(check){
    const spinner = createSpinner('Lets see...').start();
    await sleep()

    if(check){
        spinner.success({text:`Good job ${playerName}! That's correct!`}); 
    } else {
        spinner.error({text:`Sorry ${playerName}, you have failed`});
        process.exit(1);        
    }
}

async function gameFinish(){
    console.clear();
    const msg = `Congratulations ${playerName}!\n`
    figlet(msg,function(err, data){
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await gameFinish()