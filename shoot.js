AFRAME.registerComponent('bowling-balls',{
    init:function(){
        this.shootBalls();
    },
    shootBalls:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'z'){
            var balls = document.createElement('a-entity')
            balls.setAttribute('geometry',{
                primitive:'sphere',
                radius:1,
            })
            balls.setAttribute('material','color','black')
            var cam = document.querySelector('#camera')
            var pos = cam.getAttribute('position')
            balls.setAttribute('position',{
                x:pos.x,
                y:pos.y,
                z:pos.z,
            })
            var camera = document.querySelector('#camera').object3D

            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction)
            console.log(direction)
            balls.setAttribute('velocity',direction.multiplyScalar(-10))
            balls.setAttribute('dynamic-body',{
                shape:'sphere',
                mass:'0',
            })
            balls.addEventListener('collide',this.removeBalls)
            var scene = document.querySelector('#scene')
            scene.appendChild(balls)
        }
            
        })
        
    },
    removeBalls:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var el = e.detail.target.el
        var el_hit = e.detail.body.el
        if(el_hit.id.includes('pin')){
            el_hit.setAttribute('material',{
                opacity:1,
                transparent:true
            })
        }
            var impulse = new CANNON.Vec3(0,1,-15);
            var worldpoint = new CANNON.Vec3().copy(el_hit.getAttribute('position'))
             
        el_hit.body.applyImpulse(impulse, worldpoint);
        el.removeEventListener('collide',this.shootBalls)
        var scene = document.querySelector('#scene')
        scene.removeChild(el)

    },
})