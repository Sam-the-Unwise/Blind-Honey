var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 500, height: 500, backgroundColor: 0x055D07});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
var openingScene = new PIXI.Container();
openingScene.visible = true;

var gameScene_1 = new PIXI.Container();
gameScene_1.visible = false;

var gameScene_2 = new PIXI.Container();
gameScene_1.visible = false;

var gameScene_3 = new PIXI.Container();
gameScene_1.visible = false;

var gameScene_4 = new PIXI.Container();
gameScene_1.visible = false;

var instructionScene = new PIXI.Container();
instructionScene.visible = false;

var gameOverScene = new PIXI.Container();
gameOverScene.visible = false;

var creditScene = new PIXI.Container();
gameOverScene.visible = false;


PIXI.loader
    .add("Sprites/assets.json")
    .load(setup);

var opening_flying_bee, start_button, instruction_button, credits_button, 
    quit_game_button, credits, rock1, rock2, rock3, gameover, quit_credits_button, 
    quit_game_over_button, quit_instructions_button, credits_bee_1, credits_bee_2;

var right_flying_bee, left_flying_bee, up_flying_bee, down_flying_bee, 
    flower1, flower2, goodJob, youWin, next, quit_game_button_2, quit_game_button_3, quit_game_button_4;

var frames_bee_u = [], frames_bee_r = [], frames_bee_l = [], frames_bee_d = [];
    
// This will initialize all our sprites and start our gameloop
function setup()
{
    // create sprite sheets
    for (var i = 1; i <= 4; i++)
    {
        frames_bee_r.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee' + i + '.png'));
    }

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_l.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee_L' + i + '.png'));
    }

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_u.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee_T' + i + '.png'));
    }

    for (var i = 1; i <= 4; i++)
    {
        frames_bee_d.push(PIXI.Texture.fromFrame('Sprites/Sprite_Bee_D' + i + '.png'));
    }
    
    /*
            OPENING SCENE SETUP
    */
    openingScene.interactive = true;
    openingScene.visible = true;

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
    setUpSceneOne();

    /*
            END GAME SCENE SET UP  
    */
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
    credits.position.y = 600;

    credits_bee_1 = new PIXI.AnimatedSprite(frames_bee_u);
    creditScene.addChild(credits_bee_1);
    credits_bee_1.scale.set(1, 1);
    credits_bee_1.position.x = 70;
    credits_bee_1.position.y = 600;
    credits_bee_1.animationSpeed = 0.25;
    credits_bee_1.play();

    credits_bee_2 = new PIXI.AnimatedSprite(frames_bee_u);
    creditScene.addChild(credits_bee_2);
    credits_bee_2.scale.set(1, 1);
    credits_bee_2.position.x = 400;
    credits_bee_2.position.y = 600;
    credits_bee_2.animationSpeed = 0.25;
    credits_bee_2.play();

    credits_bee_1.visible = false;
    credits_bee_2.visible = false;

    animate();
}

function setUpSceneOne()
{
    /*
            GAME SCENE 1
    */
    gameScene_1.interactive = false;
    gameScene_1.visible = false;

    right_flying_bee = new PIXI.AnimatedSprite(frames_bee_r);
    right_flying_bee.scale.set(1, 1);
    right_flying_bee.position.x = 200;
    right_flying_bee.position.y = 200;
    right_flying_bee.animationSpeed = 0.25;
    right_flying_bee.play();
    gameScene_1.addChild(right_flying_bee);

    left_flying_bee = new PIXI.AnimatedSprite(frames_bee_l);
    left_flying_bee.scale.set(1, 1);
    left_flying_bee.position.x = 200;
    left_flying_bee.position.y = 200;
    left_flying_bee.animationSpeed = 0.25;
    left_flying_bee.play();
    gameScene_1.addChild(left_flying_bee);

    up_flying_bee = new PIXI.AnimatedSprite(frames_bee_u);
    up_flying_bee.scale.set(1, 1);
    up_flying_bee.position.x = 200;
    up_flying_bee.position.y = 200;
    up_flying_bee.animationSpeed = 0.25;
    up_flying_bee.play();
    gameScene_1.addChild(up_flying_bee);

    down_flying_bee = new PIXI.AnimatedSprite(frames_bee_d);
    down_flying_bee.scale.set(1, 1);
    down_flying_bee.position.x = 200;
    down_flying_bee.position.y = 200;
    down_flying_bee.animationSpeed = 0.25;
    down_flying_bee.play();
    gameScene_1.addChild(down_flying_bee);

    left_flying_bee.visible = false;
    up_flying_bee.visible = false;
    down_flying_bee.visible = false;

    quit_game_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    gameScene_1.addChild(quit_game_button);
    quit_game_button.anchor.x = .5;
    quit_game_button.anchor.y = .5;
    quit_game_button.position.x = 450;
    quit_game_button.position.y = 20;
    
    quit_game_button.interactive = false;

    rock1 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock.png"));
    rock2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock2.png"));
    rock3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock3.png"));
    rock4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock3.png"));

    gameScene_1.addChild(rock1);
    gameScene_1.addChild(rock2);
    gameScene_1.addChild(rock3);
    gameScene_1.addChild(rock4);

    rock1.position.x = 20;
    rock1.position.y = 300;
    
    rock2.position.x = 400;
    rock2.position.y = 90;

    rock3.position.x = 200;
    rock3.position.y = 400;

    rock4.position.x = 200;
    rock4.position.y = 50;

    flower1 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Flower.png"));

    gameScene_1.addChild(flower1);

    flower1.position.x = 350;
    flower1.position.y = 375;

    goodJob = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Good_Job.png"));

    gameScene_1.addChild(goodJob);
    goodJob.position.x = 250;
    goodJob.position.y = 300;
    goodJob.anchor.x = .5
    goodJob.anchor.y = .5
    goodJob.visible = false;

    next = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Next.png"));

    gameScene_1.addChild(next);
    next.position.x = 250;
    next.position.y = 100;
    next.anchor.x = .5
    next.anchor.y = .5
    next.visible = false;
}

function setUpSceneTwo()
{
    /*
            GAME SCENE 2
    */

    right_flying_bee = new PIXI.AnimatedSprite(frames_bee_r);
    gameScene_2.addChild(right_flying_bee);
    right_flying_bee.scale.set(1, 1);
    right_flying_bee.position.x = 200;
    right_flying_bee.position.y = 270;
    right_flying_bee.animationSpeed = 0.25;
    right_flying_bee.play();

    gameScene_2.addChild(left_flying_bee);
    left_flying_bee.scale.set(1, 1);
    left_flying_bee.position.x = 200;
    left_flying_bee.position.y = 250;
    left_flying_bee.animationSpeed = 0.25;
    left_flying_bee.play();
    
    gameScene_2.addChild(up_flying_bee);
    up_flying_bee.scale.set(1, 1);
    up_flying_bee.position.x = 200;
    up_flying_bee.position.y = 270;
    up_flying_bee.animationSpeed = 0.25;
    up_flying_bee.play();
    
    gameScene_2.addChild(down_flying_bee);
    down_flying_bee.scale.set(1, 1);
    down_flying_bee.position.x = 200;
    down_flying_bee.position.y = 250;
    down_flying_bee.animationSpeed = 0.25;
    down_flying_bee.play();

    left_flying_bee.visible = false;
    up_flying_bee.visible = true;
    down_flying_bee.visible = false;
    right_flying_bee.visible = false;

    quit_game_button_2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    gameScene_2.addChild(quit_game_button_2);
    quit_game_button_2.anchor.x = .5;
    quit_game_button_2.anchor.y = .5;
    quit_game_button_2.position.x = 450;
    quit_game_button_2.position.y = 20;

    quit_game_button_2.interactive = true;
    quit_game_button_2.visible = true;

    gameScene_2.addChild(rock1);
    gameScene_2.addChild(rock2);
    gameScene_2.addChild(rock3);
    gameScene_2.addChild(rock4);

    rock1.position.x = 330;
    rock1.position.y = 250;
    
    rock2.position.x = 10;
    rock2.position.y = 250;

    rock3.position.x = 300;
    rock3.position.y = 400;

    rock4.position.x = 20;
    rock4.position.y = 50;

    gameScene_2.addChild(flower1);

    flower1.position.x = 10;
    flower1.position.y = 375;

    gameScene_2.addChild(goodJob);
    goodJob.position.x = 250;
    goodJob.position.y = 300;
    goodJob.anchor.x = .5
    goodJob.anchor.y = .5
    goodJob.visible = false;

    gameScene_2.addChild(next);
    next.position.x = 250;
    next.position.y = 100;
    next.anchor.x = .5
    next.anchor.y = .5
    next.visible = false;

    flower1.visible = true;
    gameScene_1.visible = false;
    gameScene_1.interactive = false;
    gameScene_2.visible = true;
    gameScene_2.interactive = true;
}

function setUpSceneThree()
{
    /*
            GAME SCENE 3
    */
    gameScene_2.interactive = false;
    gameScene_2.visible = false;

    right_flying_bee = new PIXI.AnimatedSprite(frames_bee_r);
    right_flying_bee.scale.set(1, 1);
    right_flying_bee.position.x = 20;
    right_flying_bee.position.y = 20;
    right_flying_bee.animationSpeed = 0.25;
    right_flying_bee.play();
    gameScene_3.addChild(right_flying_bee);

    left_flying_bee.scale.set(1, 1);
    left_flying_bee.position.x = 200;
    left_flying_bee.position.y = 200;
    left_flying_bee.animationSpeed = 0.25;
    left_flying_bee.play();
    gameScene_3.addChild(left_flying_bee);

    up_flying_bee.scale.set(1, 1);
    up_flying_bee.position.x = 200;
    up_flying_bee.position.y = 200;
    up_flying_bee.animationSpeed = 0.25;
    up_flying_bee.play();
    gameScene_3.addChild(up_flying_bee);

    down_flying_bee.scale.set(1, 1);
    down_flying_bee.position.x = 20;
    down_flying_bee.position.y = 20;
    down_flying_bee.animationSpeed = 0.25;
    down_flying_bee.play();
    gameScene_3.addChild(down_flying_bee);

    left_flying_bee.visible = false;
    up_flying_bee.visible = false;
    down_flying_bee.visible = true;
    right_flying_bee.visible = false;

    quit_game_button_3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    gameScene_3.addChild(quit_game_button_3);
    quit_game_button_3.anchor.x = .5;
    quit_game_button_3.anchor.y = .5;
    quit_game_button_3.position.x = 450;
    quit_game_button_3.position.y = 20;
    
    quit_game_button_3.interactive = true;

    gameScene_3.addChild(rock1);
    gameScene_3.addChild(rock2);
    gameScene_3.addChild(rock3);
    gameScene_3.addChild(rock4);

    rock1.position.x = 100;
    rock1.position.y = 400;
    
    rock2.position.x = 435;
    rock2.position.y = 360;

    rock3.position.x = 132;
    rock3.position.y = 20;

    rock4.position.x = 20;
    rock4.position.y = 300;

    gameScene_3.addChild(flower1);

    flower1.position.x = 400;
    flower1.position.y = 42;

    flower1.visible = true;
    gameScene_2.visible = false;
    gameScene_2.interactive = false;
    gameScene_3.visible = true;
    gameScene_3.interactive = true;

    gameScene_3.addChild(goodJob);
    goodJob.position.x = 250;
    goodJob.position.y = 300;
    goodJob.anchor.x = .5
    goodJob.anchor.y = .5
    goodJob.visible = false;

    gameScene_3.addChild(next);
    next.position.x = 250;
    next.position.y = 100;
    next.anchor.x = .5
    next.anchor.y = .5
    next.visible = false;
}

function setUpSceneFour()
{
    /*
            GAME SCENE 4
    */
    right_flying_bee.scale.set(1, 1);
    right_flying_bee.position.x = 200;
    right_flying_bee.position.y = 200;
    right_flying_bee.animationSpeed = 0.25;
    right_flying_bee.play();
    gameScene_4.addChild(right_flying_bee);

    left_flying_bee.scale.set(1, 1);
    left_flying_bee.position.x = 450;
    left_flying_bee.position.y = 100;
    left_flying_bee.animationSpeed = 0.25;
    left_flying_bee.play();
    gameScene_4.addChild(left_flying_bee);

    up_flying_bee = new PIXI.AnimatedSprite(frames_bee_u);
    up_flying_bee.scale.set(1, 1);
    up_flying_bee.position.x = 200;
    up_flying_bee.position.y = 200;
    up_flying_bee.animationSpeed = 0.25;
    up_flying_bee.play();
    gameScene_4.addChild(up_flying_bee);

    down_flying_bee.scale.set(1, 1);
    down_flying_bee.position.x = 200;
    down_flying_bee.position.y = 200;
    down_flying_bee.animationSpeed = 0.25;
    down_flying_bee.play();
    gameScene_4.addChild(down_flying_bee);

    left_flying_bee.visible = true;
    up_flying_bee.visible = false;
    down_flying_bee.visible = false;
    right_flying_bee.visible = false;

    quit_game_button_4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    gameScene_4.addChild(quit_game_button_4);
    quit_game_button_4.anchor.x = .5;
    quit_game_button_4.anchor.y = .5;
    quit_game_button_4.position.x = 450;
    quit_game_button_4.position.y = 20;
    
    quit_game_button_4.interactive = true;

    gameScene_4.addChild(rock1);
    gameScene_4.addChild(rock2);
    gameScene_4.addChild(rock3);
    gameScene_4.addChild(rock4);

    rock1.position.x = 75;
    rock1.position.y = 300;
    
    rock3.position.x = 380;
    rock3.position.y = 440;

    rock2.position.x = 430;
    rock2.position.y = 260;

    rock4.position.x = 30;
    rock4.position.y = 80;

    gameScene_4.addChild(flower1);

    flower1.position.x = 20;
    flower1.position.y = 410;

    flower1.visible = true;

    goodJob = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_You_Win.png"));
    gameScene_4.addChild(goodJob);
    goodJob.position.x = 250;
    goodJob.position.y = 300;
    goodJob.anchor.x = .5
    goodJob.anchor.y = .5
    goodJob.visible = false;

    gameScene_4.addChild(next);
    next.position.x = 250;
    next.position.y = 100;
    next.anchor.x = .5
    next.anchor.y = .5
    next.visible = false;

    gameScene_3.visible = false;
    gameScene_3.interactive = false;
    gameScene_4.visible = true;
    gameScene_4.interactive = true;
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

    //setUpSceneOne();
    setUpSceneFour();
    flower1.visible = true;
    // gameScene_1.visible = true;
    // gameScene_1.interactive = true;
    gameScene_4.visible = true;
    gameScene_4.interactive = true;
}

// all the code that will run at the end of the game
function end()
{
    gameScene_1.interactive = false;
    
    gameOverScene.visible = true;
    gameOverScene.interactive = true;
}

function quit()
{
    // if quit, show game over scene and get ride of game scene
    gameOverScene.interactive = true;
    gameOverScene.visible = true;

    gameScene_1.visible = false;
    gameScene_1.interactive = false;
    gameScene_2.visible = false;
    gameScene_2.interactive = false;
    gameScene_3.visible = false;
    gameScene_3.interactive = false;
    gameScene_4.visible = false;
    gameScene_4.interactive = false;
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
    gameScene_4.interactive = false;
    gameScene_4.visible = false;
    creditScene.visible = true;
    creditScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;
    credits_bee_1.visible = true;
    credits_bee_2.visible = true;
    credits_bee_1.interactive = true;
    credits_bee_2.interactive = true;

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

function collisionBetween(sprite1, sprite2)
{
    var sprite1_bottom = sprite1.y + sprite1.height/4,
        sprite1_top = sprite1.y - sprite1.height/4,
        sprite1_right_side = sprite1.x + sprite1.width/2,
        sprite1_left_side = sprite1.x - sprite1.width/2;

    var sprite2_bottom = sprite2.y + sprite2.height/4,
        sprite2_top = sprite2.y - sprite2.height/4,
        sprite2_right_side = sprite2.x + sprite2.width,
        sprite2_left_side = sprite2.x - sprite2.width/6;


    var hitFromAbove = (sprite1_bottom >= sprite2_top) 
                        && (sprite1_top <= sprite2_top)
                        && (sprite1.x > sprite2_left_side) 
                        && (sprite1.x < sprite2_right_side);

    var hitFromBelow = (sprite1_top <= sprite2_bottom) 
                        && (sprite1_bottom >= sprite2_bottom) 
                        && (sprite1.x > sprite2_left_side) 
                        && (sprite1.x < sprite2_right_side);

    var hitFromLeft = (sprite1_right_side >= sprite2_left_side) 
                        && (sprite1_left_side <= sprite2_left_side)
                        && (sprite1.y > sprite2_top) 
                        && (sprite1.y < sprite2_bottom);

    var hitFromRight = (sprite1_left_side <= sprite2_right_side) 
                        && (sprite1_right_side >= sprite2_right_side)
                        && (sprite1.y > sprite2_top) 
                        && (sprite1.y < sprite2_bottom);

    return hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight;
}

function finished()
{
    start();
    playCredits();
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
    
    // HANLDING SCENE 1
    else if(gameScene_1.interactive)
    {
        // show game over if bee fly's off screen
        if(down_flying_bee.y > renderer.height
            || up_flying_bee.y < 0
            || left_flying_bee.x < 0
            || right_flying_bee.x > renderer.width)
        {
            quit();
        }

        if(collisionBetween(down_flying_bee, rock3))
        {
            createjs.Tween.removeTweens(down_flying_bee.position);
        }

        if(collisionBetween(up_flying_bee, rock4))
        {
            createjs.Tween.removeTweens(up_flying_bee.position);
        }

        if(collisionBetween(right_flying_bee, flower1))
        {
            createjs.Tween.removeTweens(right_flying_bee.position);
            flower1.visible = false;
            right_flying_bee.interactive = false;
            left_flying_bee.interactive = false;
            up_flying_bee.interactive = false;
            down_flying_bee.interactive = false;
            goodJob.visible = true;
            next.visible = true;
            next.interactive = true;
            right_flying_bee.rotation -= .1;
        }

        next.on('mousedown', setUpSceneTwo);

        right_flying_bee.interactive = true;
        quit_game_button.interactive = true;
        quit_game_button.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_1);
    }

    // HANDLING SCENE 2
    else if(gameScene_2.interactive)
    {
        // show game over if bee fly's off screen
        if(down_flying_bee.position.y > renderer.height
            || up_flying_bee.y < 0
            || left_flying_bee.x < 0
            || right_flying_bee.x > renderer.width)
        {
            quit();
        }

        if(collisionBetween(right_flying_bee, rock1))
        {
            createjs.Tween.removeTweens(right_flying_bee.position);
        }

        if(collisionBetween(down_flying_bee, rock3))
        {
            createjs.Tween.removeTweens(down_flying_bee.position);
        }

        if(collisionBetween(left_flying_bee, rock2))
        {
            createjs.Tween.removeTweens(left_flying_bee.position);
        }

        if(collisionBetween(left_flying_bee, flower1))
        {
            createjs.Tween.removeTweens(left_flying_bee.position);
            flower1.visible = false;
            right_flying_bee.interactive = false;
            left_flying_bee.interactive = false;
            up_flying_bee.interactive = false;
            down_flying_bee.interactive = false;
            goodJob.visible = true;
            next.visible = true;
            next.interactive = true;
            right_flying_bee.rotation -= .1;
        }

        next.on('mousedown', setUpSceneThree);

        quit_game_button_2.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_2);
    }

    //HANDLING SCENE 3
    else if(gameScene_3.interactive)
    {
        // show game over if bee fly's off screen
        if(down_flying_bee.y > renderer.height
            || up_flying_bee.y < 0
            || left_flying_bee.x < 0
            || right_flying_bee.x > renderer.width)
        {
            quit();
        }

        //rock 4 - top
        if(collisionBetween(right_flying_bee, rock3))
        {
            createjs.Tween.removeTweens(right_flying_bee.position);
        }

        //rock 1 - bottom
        if(collisionBetween(down_flying_bee, rock1))
        {
            createjs.Tween.removeTweens(down_flying_bee.position);
        }

        //rock 2 - right
        if(collisionBetween(rock2, right_flying_bee))
        {
            createjs.Tween.removeTweens(right_flying_bee.position);
        }

        if(collisionBetween(up_flying_bee, flower1))
        {
            createjs.Tween.removeTweens(up_flying_bee.position);
            flower1.visible = false;
            up_flying_bee.interactive = false;
            left_flying_bee.interactive = false;
            up_flying_bee.interactive = false;
            down_flying_bee.interactive = false;
            goodJob.visible = true;
            next.visible = true;
            next.interactive = true;
            up_flying_bee.rotation -= .1;
        }

        next.on('mousedown', setUpSceneFour);

        quit_game_button_3.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_3);
    }

    // HANDLING SCENE 4
    else if(gameScene_4.interactive)
    {
        // show game over if bee fly's off screen
        if(down_flying_bee.y > renderer.height
            || up_flying_bee.y < 0
            || left_flying_bee.x < 0
            || right_flying_bee.x > renderer.width)
        {
            quit();
        }

        if(collisionBetween(left_flying_bee, rock4))
        {
            createjs.Tween.removeTweens(left_flying_bee.position);
        }

        if(collisionBetween(down_flying_bee, rock2))
        {
            createjs.Tween.removeTweens(down_flying_bee.position);
        }

        if(collisionBetween(rock2, right_flying_bee))
        {
            createjs.Tween.removeTweens(right_flying_bee.position);
        }

        if(collisionBetween(down_flying_bee, rock3))
        {
            createjs.Tween.removeTweens(down_flying_bee.position);
        }

        if(collisionBetween(down_flying_bee, rock1))
        {
            createjs.Tween.removeTweens(down_flying_bee.position);
        }

        if(collisionBetween(left_flying_bee, flower1))
        {
            createjs.Tween.removeTweens(left_flying_bee.position);
            flower1.visible = false;
            left_flying_bee.interactive = false;
            right_flying_bee.interactive = false;
            up_flying_bee.interactive = false;
            down_flying_bee.interactive = false;
            goodJob.visible = true;
            next.visible = true;
            next.interactive = true;
            left_flying_bee.rotation += .1;
        }

        next.on('mousedown', playCredits);

        quit_game_button_4.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_4);
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
        createjs.Tween.get(credits).to({y: -100}, 10000);
        createjs.Tween.get(credits_bee_1.position).to({y: -100}, 10000);
        createjs.Tween.get(credits_bee_2.position).to({y: -100}, 10000);


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
            createjs.Tween.get(left_flying_bee.position).to({x: left_flying_bee.position.x-550}, 5000);
        }

        else if (e.keyCode == 68) //D //RIGHT
        {
            right_flying_bee.position.x = current_bee_x;
            right_flying_bee.position.y = current_bee_y;
            right_flying_bee.visible = true;
            right_flying_bee.interactive = true;

            createjs.Tween.get(right_flying_bee.position).to({x: right_flying_bee.position.x + 550}, 5000);
        }

        else if (e.keyCode == 83) //S //DOWN
        {
            down_flying_bee.position.x = current_bee_x;
            down_flying_bee.position.y = current_bee_y;
            down_flying_bee.visible = true;
            down_flying_bee.interactive = true;

            createjs.Tween.get(down_flying_bee.position).to({y: down_flying_bee.position.y + 550}, 5000);
        }

        else if (e.keyCode == 87) //W //UP
        {
            up_flying_bee.position.x = current_bee_x;
            up_flying_bee.position.y = current_bee_y;
            up_flying_bee.visible = true;
            up_flying_bee.interactive = true;
            createjs.Tween.get(up_flying_bee.position).to({y: up_flying_bee.position.y-550}, 5000);
        }
    }
}

animate();