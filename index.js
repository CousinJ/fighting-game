const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = .5
class Sprite {
    constructor({position, velocity, color, offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey 
        this.attackBox = {

            position: {
                x: this.position.x,
                y: this.position.y
            } ,
            offset: offset,
            width: 100 ,
            height: 50
        }
        this.color = color
        this.isAttacking
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)
        // attack box
        if(this.isAttacking) {
        c.fillStyle = 'blue'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height  ) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}



//===============player=================
const player = new Sprite(

    {
        position:{
        x: 0,
        y: 0
    },  velocity:{
        x: 0,
        y: 20
    }, color: 'green',
       offset: {
        x: 0,
        y: 0

       }
}
)
//===============enemy=====================

const enemy = new Sprite(

    {
        position:{
        x: 300,
        y: 50
    },  velocity:{
        x: 0,
        y: 10
    }, color: 'yellow',
    offset: {
        x: -50,
        y: 0

       }
}
)
//======================================






const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
   
}


function rectCollide({rect1, rect2}) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x && rect2.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y && rect2.attackBox.position.y <= rect2.position.y + rect2.height 
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
// player movement
    player.velocity.x = 0

    if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
    } else if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
    }

    //detect collision
    if(rectCollide({
        rect1: player ,
        rect2: enemy
    }) && player.isAttacking) 
     {
        player.isAttacking = false
        console.log('attack')
    }
    
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -15
            
            break
        case ' ':
            player.attack()
            break
    }
    
    console.log(event.key)

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        
    }
    console.log(event.key)

})