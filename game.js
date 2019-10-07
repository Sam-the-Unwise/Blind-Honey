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
    quit_game_button, credits, rock1, rock2, rock3, gameover, flower1, flower2,
    flower3, quit_credits_button, quit_game_over_button, quit_instructions_button;

// This will initialize all our sprites and start our gameloop
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
    rock4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Rock3.png"));

    gameScene.addChild(rock1);
    gameScene.addChild(rock2);
    gameScene.addChild(rock3);
    gameScene.addChild(rock4);

    rock1.position.x = 20;
    rock1.position.y = 300;
    
    rock2.position.x = 400;
    rock2.position.y = 90;

    rock3.position.x = 200;
    rock3.position.y = 400;

    rock4.position.x = 200;
    rock4.position.y = 50;

    flower1 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Flower.png"));

    gameScene.addChild(flower1);

    flower1.position.x = 350;
    flower1.position.y = 375;

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
    
    flower1.visible = true;
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

function collisionBetween(sprite1, sprite2)
{
    var sprite1_bottom = sprite1.y + sprite1.height/4,
        sprite1_top = sprite1.y - sprite1.height/4,
        sprite1_right_side = sprite1.x + sprite1.width/2,
        sprite1_left_side = sprite1.x - sprite1.width/2;

    var sprite2_bottom = sprite2.y + sprite2.height/4,
        sprite2_top = sprite2.y - sprite2.height/4,
        sprite2_right_side = sprite2.x + sprite2.width/2,
        sprite2_left_side = sprite2.x - sprite2.width/2;


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

function box_point_intersection(box, x, y) {
    if (box.position.x > x) return false;
    if (x > box.position.x + box.width) return false;
    if (box.position.y > y) return false;
    if (y > box.position.y + box.height) return false;

    return true;
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
            //next_scene()
        }

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
        createjs.Tween.get(credits).to({y: -100}, 10000);


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
            createjs.Tween.get(left_flying_bee).to({x: -50}, 5000);
        }

        else if (e.keyCode == 68) //D //RIGHT
        {
            right_flying_bee.position.x = current_bee_x;
            right_flying_bee.position.y = current_bee_y;
            right_flying_bee.visible = true;
            right_flying_bee.interactive = true;

            createjs.Tween.get(right_flying_bee).to({x: 550}, 5000);
        }

        else if (e.keyCode == 83) //S //DOWN
        {
            down_flying_bee.position.x = current_bee_x;
            down_flying_bee.position.y = current_bee_y;
            down_flying_bee.visible = true;
            down_flying_bee.interactive = true;

            createjs.Tween.get(down_flying_bee.position).to({y: 550}, 5000);
        }

        else if (e.keyCode == 87) //W //UP
        {
            up_flying_bee.position.x = current_bee_x;
            up_flying_bee.position.y = current_bee_y;
            up_flying_bee.visible = true;
            up_flying_bee.interactive = true;
            createjs.Tween.get(up_flying_bee).to({y: -50}, 5000);
        }
    }
}

animate();