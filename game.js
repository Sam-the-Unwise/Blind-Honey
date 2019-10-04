var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 500, height: 500, backgroundColor: 0x055D07});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
var openingScene = new PIXI.Container();
openingScene.visible = true;

var gameScene = new PIXI.Container();
gameScene.visible = false;

var instructionScene = new PIXI.Container();
instructionScene.visible = false;

var gameOverScene = new PIXI.Container();
gameOverScene.visible = false;

var creditScene = new PIXI.Container();
gameOverScene.visible = false;


PIXI.loader
    .add("spritesheet", "Sprites/Sprite_Bee1.png")
    .load(setup);

var opening_flying_bee, start_button, instruction_button, credits_button, 
    right_flying_bee, left_flying_bee, up_flying_bee, down_flying_bee, 
    quit_game_button, credits, rock1, rock2, rock3, gameover, 
    quit_credits_button, quit_game_over_button, quit_instructions_button;

// This will initialize all our sprites, set the state = play
//      and start our game loop
function setup()
{
    /*
            OPENING SCENE SETUP
    */

    openingScene.interactive = true;
    openingScene.visible = true;

    var frames_bee_r = [];

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_r.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee' + i + '.png'));
    }

    var frames_bee_l = [];

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_l.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee_L' + i + '.png'));
    }

    opening_flying_bee_r = new PIXI.AnimatedSprite(frames_bee_r);
    opening_flying_bee_r.scale.set(1, 1);
    opening_flying_bee_r.position.x = 10;
    opening_flying_bee_r.position.y = 460;
    opening_flying_bee_r.animationSpeed = 0.25;
    opening_flying_bee_r.play();
    openingScene.addChild(opening_flying_bee_r);

    opening_flying_bee_l = new PIXI.AnimatedSprite(frames_bee_l);
    opening_flying_bee_l.scale.set(1, 1);
    opening_flying_bee_l.position.x = 460;
    opening_flying_bee_l.position.y = 10;
    opening_flying_bee_l.animationSpeed = 0.20;
    opening_flying_bee_l.play();
    openingScene.addChild(opening_flying_bee_l);

    start_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Start_Button.png"));
    instruction_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_How_To_Play.png"));
    credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Credits_Button.png"));

    openingScene.addChild(start_button);
    openingScene.addChild(instruction_button);
    openingScene.addChild(credits_button);

    start_button.anchor.x = .5;
    start_button.anchor.y = .5;
    start_button.position.x = 250;
    start_button.position.y = 150;

    instruction_button.anchor.x = .5;
    instruction_button.anchor.y = .5;
    instruction_button.position.x = 250;
    instruction_button.position.y = 250;

    credits_button.anchor.x = .5;
    credits_button.anchor.y = .5;
    credits_button.position.x = 250;
    credits_button.position.y = 350;

    start_button.interactive = false;
    instruction_button.interactive = false;
    credits_button.interactive = false;


    /*
            INSTRUCTION SCENE SETUP
    */
    instructionScene.interactive = false;
    instructionScene.visible = false;

    quit_instructions_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    instructionScene.addChild(quit_instructions_button);
    quit_instructions_button.anchor.x = .5;
    quit_instructions_button.anchor.y = .5;
    quit_instructions_button.position.x = 450;
    quit_instructions_button.position.y = 20;
    
    quit_instructions_button.interactive = false;

    instructions = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Instructions.png"));

    instructionScene.addChild(instructions);
    instructions.anchor.x = .5;
    instructions.anchor.y = .5;
    instructions.position.x = 250;
    instructions.position.y = 250;


    /*
            GAME SCENE SETUP
    */
    gameScene.interactive = false;
    gameScene.visible = false;

    var frames_bee_u = [];

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_u.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee_T' + i + '.png'));
    }

    var frames_bee_d = [];

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_d.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee_D' + i + '.png'));
    }

    right_flying_bee = new PIXI.AnimatedSprite(frames_bee_r);
    right_flying_bee.scale.set(1, 1);
    right_flying_bee.position.x = 200;
    right_flying_bee.position.y = 200;
    right_flying_bee.animationSpeed = 0.25;
    right_flying_bee.play();
    gameScene.addChild(right_flying_bee);

    left_flying_bee = new PIXI.AnimatedSprite(frames_bee_l);
    left_flying_bee.scale.set(1, 1);
    left_flying_bee.position.x = 200;
    left_flying_bee.position.y = 200;
    left_flying_bee.animationSpeed = 0.25;
    left_flying_bee.play();
    gameScene.addChild(left_flying_bee);

    up_flying_bee = new PIXI.AnimatedSprite(frames_bee_u);
    up_flying_bee.scale.set(1, 1);
    up_flying_bee.position.x = 200;
    up_flying_bee.position.y = 200;
    up_flying_bee.animationSpeed = 0.25;
    up_flying_bee.play();
    gameScene.addChild(up_flying_bee);

    down_flying_bee = new PIXI.AnimatedSprite(frames_bee_d);
    down_flying_bee.scale.set(1, 1);
    down_flying_bee.position.x = 200;
    down_flying_bee.position.y = 200;
    down_flying_bee.animationSpeed = 0.25;
    down_flying_bee.play();
    gameScene.addChild(down_flying_bee);

    left_flying_bee.visible = false;
    up_flying_bee.visible = false;
    down_flying_bee.visible = false;

    quit_game_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    gameScene.addChild(quit_game_button);
    quit_game_button.anchor.x = .5;
    quit_game_button.anchor.y = .5;
    quit_game_button.position.x = 450;
    quit_game_button.position.y = 20;
    
    quit_game_button.interactive = false;

    rock1 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock.png"));
    rock2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock2.png"));
    rock3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock3.png"));
    
    gameScene.addChild(rock1);
    gameScene.addChild(rock2);
    gameScene.addChild(rock3);

    rock1.position.x = 20;
    rock1.position.y = 40;
    
    rock2.position.x = 400;
    rock2.position.y = 60;

    rock3.position.x = 200;
    rock3.position.y = 400;

    // set up end game scene
    gameOverScene.interactive = false;
    gameOverScene.visible = false;

    gameover = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Game_Over.png"));
    gameOverScene.addChild(gameover);

    gameover.anchor.x = .5;
    gameover.anchor.y = .5;
    gameover.position.x = 250;
    gameover.position.y = 250;

    quit_game_over_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    gameOverScene.addChild(quit_game_over_button);
    quit_game_over_button.anchor.x = .5;
    quit_game_over_button.anchor.y = .5;
    quit_game_over_button.position.x = 450;
    quit_game_over_button.position.y = 20;
    
    quit_game_over_button.interactive = false;

    /*
            CREDITS
    */

    creditScene.interactive = false;
    creditScene.visible = false;

    quit_credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    creditScene.addChild(quit_credits_button);
    quit_credits_button.anchor.x = .5;
    quit_credits_button.anchor.y = .5;
    quit_credits_button.position.x = 450;
    quit_credits_button.position.y = 20;
    
    quit_credits_button.interactive = false;

    credits = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Credits.png"));

    creditScene.addChild(credits);
    credits.anchor.x = .5;
    credits.anchor.y = .5;
    credits.position.x = 250;
    credits.position.y = 250;


    animate();
}


function start() 
{
    if(openingScene.interactive)
    {
        openingScene.interactive = false;
        start_button.interactive = false;
        instruction_button.interactive = false;
        credits_button.interactive = false;
        openingScene.visible = false;
    }

    gameScene.visible = true;
    gameScene.interactive = true;
}

// all the code that will run at the end of the game
function end()
{
    gameScene.interactive = false;
    
    gameOverScene.visible = true;
    gameOverScene.interactive = true;
}

function quit()
{
    // if quit, show game over scene and get ride of game scene
    gameOverScene.interactive = true;
    gameOverScene.visible = true;

    gameScene.visible = false;
    gameScene.interactive = false;
    left_flying_bee.visible = false;
    up_flying_bee.visible = false;
    down_flying_bee.visible = false;

    // reset our sprites so the game can be restarted
    right_flying_bee.position.x = 200;
    right_flying_bee.position.y = 200;

    renderer.render(gameOverScene);
}

// used for quit_credits and quit_instructions to take you back to the home screen
function quit_to_home()
{
    instructionScene.interactive = false;
    instructionScene.visible = false;
    openingScene.interactive = true;
    openingScene.visible = true;

    renderer.render(openingScene);
}

function quit_gameover()
{
    gameOverScene.interactive = false;
    gameOverScene.visible = false;
    openingScene.interactive = true;
    openingScene.visible = true;

    renderer.render(openingScene);
}

function playCredits()
{
    creditScene.visible = true;
    creditScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    renderer.render(creditScene);
}

function instructionHandler(e)
{
    instructionScene.visible = true;
    instructionScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    renderer.render(instructionScene);
}

function animate()
{
    requestAnimationFrame(animate);

    if(openingScene.interactive)
    {
        start_button.interactive = true;
        instruction_button.interactive = true;
        credits_button.interactive = true;
        start_button.on('mousedown', start);
        instruction_button.on('mousedown', instructionHandler);
        credits_button.on('mousedown', playCredits);

        renderer.render(openingScene);
    }
    
    else if(gameScene.interactive)
    {
        right_flying_bee.interactive = true;
        quit_game_button.interactive = true;
        quit_game_button.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene);
    }

    else if(instructionScene.interactive)
    { 
        quit_instructions_button.interactive = true;
        quit_instructions_button.on('mousedown', quit_to_home);

        renderer.render(instructionScene);
    }

    else if(gameOverScene.interactive)
    {
        quit_game_over_button.interactive = true;
        quit_game_over_button.on('mousedown', quit_gameover);

        renderer.render(gameOverScene);
    }

    else if(creditScene.interactive)
    {
        quit_credits_button.interactive = true;
        quit_credits_button.on('mousedown', quit_to_home);

        renderer.render(creditScene);
    }
}

//CREATE HANDLER FUNCTIONS
function keydownHandler(e)
{
    if(e.keyCode == 65 
        || e.keyCode == 68 
        || e.keyCode == 83 
        || e.keyCode == 87)
    {
        var current_bee_x, current_bee_y;

        if(left_flying_bee.visible)
        {
            current_bee_x = left_flying_bee.position.x;
            current_bee_y = left_flying_bee.position.y;
            left_flying_bee.interactive = false;
            left_flying_bee.visible = false;
        }
        else if(right_flying_bee.visible)
        {
            current_bee_x = right_flying_bee.position.x;
            current_bee_y = right_flying_bee.position.y;
            right_flying_bee.interactive = false;
            right_flying_bee.visible = false;
        }
        else if(up_flying_bee.visible)
        {
            current_bee_x = up_flying_bee.position.x;
            current_bee_y = up_flying_bee.position.y;
            up_flying_bee.interactive = false;
            up_flying_bee.visible = false;
        }
        else if(down_flying_bee.visible)
        {
            current_bee_x = down_flying_bee.position.x;
            current_bee_y = down_flying_bee.position.y;
            down_flying_bee.interactive = false;
            down_flying_bee.visible = false;
        }


        if (e.keyCode == 65) //A //LEFT
        {
            left_flying_bee.position.x = current_bee_x;
            left_flying_bee.position.y = current_bee_y;
            left_flying_bee.visible = true;
            left_flying_bee.interactive = true;
            createjs.Tween.get(left_flying_bee).to({x: left_flying_bee.position.x - 50}, 1000);
        }

        else if (e.keyCode == 68) //D //RIGHT
        {
            right_flying_bee.position.x = current_bee_x;
            right_flying_bee.position.y = current_bee_y;
            right_flying_bee.visible = true;
            right_flying_bee.interactive = true;
            createjs.Tween.get(right_flying_bee).to({x: right_flying_bee.position.x + 50}, 1000);
        }

        else if (e.keyCode == 83) //S //DOWN
        {
            down_flying_bee.position.x = current_bee_x;
            down_flying_bee.position.y = current_bee_y;
            down_flying_bee.visible = true;
            down_flying_bee.interactive = true;
            createjs.Tween.get(down_flying_bee).to({y: down_flying_bee.position.y + 50}, 1000);
        }

        else if (e.keyCode == 87) //W //UP
        {
            up_flying_bee.position.x = current_bee_x;
            up_flying_bee.position.y = current_bee_y;
            up_flying_bee.visible = true;
            up_flying_bee.interactive = true;
            createjs.Tween.get(up_flying_bee).to({y: up_flying_bee.position.y - 50}, 1000);
        }
    }
}

animate();