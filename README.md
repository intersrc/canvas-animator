# WIP

### Examples
[https://lingxiteam.github.io/canvas-animator/](https://lingxiteam.github.io/canvas-animator/)

```javascript
import Animator from './Animator'
import Animation from './animations/Bangs'

const canvas = document.getElementById('js-canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
canvas.style.background = '#000'

const context = canvas.getContext('2d')
const animation = new Animation(context, canvas.width / 2, canvas.height / 2)

const animator = new Animator(animation)
animator.play()
```

### TODOs
[ ] 编写高覆盖例子
