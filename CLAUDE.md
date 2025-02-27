# CLAUDE.md - Development Guidelines

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style

- **TypeScript**: Use strict typing with explicit interfaces
- **Components**: Functional components with React hooks
- **Imports**: Group imports (React, Next.js, third-party, local)
- **Naming**: PascalCase for components/types, camelCase for functions/variables
- **State Management**: Context API for global state
- **Styling**: Tailwind CSS with fluid typography
- **Error Handling**: Try/catch with early returns

## File Structure

- Component files should match component names
- Related functionality in dedicated hooks
- Types should be defined in dedicated type files
- Follow Next.js conventions for pages and routing

## Project Architecture

- NextJS 15.1 with React 19
- TypeScript with strict mode enabled
- Tailwind for styling
- Theme toggle with light/dark mode

## Motion Docs

Quick start
Motion is an animation library that's easy to start and fun to master.

Its unique hybrid engine combines the performance of the browser with the limitless potential of a JavaScript engine. This means you can animate anything, like:

HTML/CSS

SVG (like path drawing animations)

WebGL (3D graphics)

The best part? It's also tiny, with a mini HTML/SVG version of the animate() function that's just 2.5kb!

By the end of this quick guide, you'll have installed Motion and made your first animation.

Install
You can install Motion in two ways:

A package manager like npm or Yarn (most popular)

HTML script tag

Package manager
Motion can be installed via the "motion" package.

npm install motion
Then imported in your JavaScript:

import { animate, scroll } from "motion"
script tag
It's possible to import Motion directly using a script tag. This is perfect if you're working with a basic HTML page, or using a no-code tool like Webflow.

Import using the modern import syntax:

<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"
</script>

Or you can add Motion as a global variable using the legacy include:

<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
<script>
  const { animate, scroll } = Motion
</script>

Note: It's best practise to replace "latest" in these URLs with a specific version, like 11.11.13. You can find the latest version at JSDelivr.

Create an animation
The "Hello world!" of any animation library is a simple transform animation.

Let's start by importing the animate function.

import { animate } from "motion"
animate can animate one or more elements. You can either use a CSS selector (like ".my-class") or provide the elements directly:

// CSS selector
animate(".box", { rotate: 360 }))

// Elements
const boxes = document.querySelectorAll(".box")

animate(boxes, { rotate: 360 })
You can see here we're setting rotate to 360. This will rotate the element 360 degrees:

What can be animated?
Motion lets you animate anything:

CSS properties (like opacity, transform and filter)

SVG attributes and paths

Independent transforms (x, rotateY etc)

JavaScript objects (containing strings/colors/numbers)

With Motion, you don't have to worry about achieving the best performance available. When a value can be hardware accelerated, like opacity, filter or transform, it will be.

animate isn't limited to HTML. It can animate single values or any kind of object. For example, the rotation of a Three.js object:

animate(
cube.rotation,
{ y: rad(360), z: rad(360) },
{ duration: 10, repeat: Infinity, ease: "linear" }
)

Customising animations
Motion comes with smart defaults, so your animations should look and feel great out of the box. But you can further tweak options like:

Duration (how long the animation lasts)

Delay (how long it waits before starting)

Easing (how it speeds up and slows down)

Repeat (how it repeats, how many times, etc)

animate(
element,
{ scale: [0.4, 1] },
{ ease: "circInOut", duration: 1.2 }
);

Motion also has amazing spring animations for natural, kinetic animations:

animate(
element,
{ rotate: 90 },
{ type: "spring", stiffness: 300 }
);

Stagger animations
When animating multiple elements, it can feel more natural or lively to offset the animations of each. This is called staggering.

Motion provides a stagger function that can be used to dynamically set delay:

import { animate, stagger } from "motion"

animate(
"li",
{ y: 0, opacity: 1 },
{ delay: stagger(0.1) }
)

What's next?
You've just learned the basics of Motion and created a simple animation. But there's so much more to discover, like:

Keyframes and sequences: Create more complex animations

Controls: Pause, resume or change animations

Scroll-linked animations: Link values to scroll position

Scroll-triggered animations: Trigger animations when elements enter the viewport

Or you can dive straight into our examples, which are clear, simple, and feature source code that can be easily copy/pasted, or opened straight into the v0 AI code editor.

animate
The animate() function is a powerful tool for creating and controlling animations.

animate("li", { opacity: 0 })
It comes in two sizes, mini (2.5kb) and hybrid (18kb).

The mini version can animate HTML and SVG styles using native browser APIs for incredible performance.

The hybrid version can additionally animate:

Independent transforms (x/y/rotateZ etc)

More styles, like mask-image and gradients

CSS variables

SVG paths

Animation sequences

Colors/strings/numbers

JavaScript objects and WebGL

Usage
animate can be imported from the "motion" package:

// Hybrid
import { animate } from "motion"

// Mini
import { animate } from "motion/mini"
HTML & SVG
Both versions of animate are capable of animating HTML and SVG styles either by passing elements directly, or via CSS selectors.

// Element(s)
const box = document.getElementById("box")

animate(box, { opacity: 0 }, { duration: 0.5 })

// CSS selectors
animate("div", { opacity: 0 }, { duration: 0.5 })
Transforms
The hybrid version of animate can animate every transform axis independently:

Translate: x, y, z

Scale: scale, scaleX, scaleY

Rotate: rotate, rotateX, rotateY, rotateZ

Skew: skew, skewX, skewY

Perspective: transformPerspective

animate("div", { rotate: 360 })

CSS variables
Hybrid animate can animate CSS variables in every browser:

animate(element, { "--rotate": "360deg" })
Mini animate can only animate registered CSS properties in modern browsers.

SVG paths
The hybrid animate function can perform line drawing animations with most SVG elements using three special properties: pathLength, pathSpacing and pathOffset.

animate("circle", { pathLength: [0, 1] })
All three are set as a progress value between 0 and 1, 1 representing the total length of the path.

Path animations are compatible with circle, ellipse, line, path, polygon, polyline and rect elements.

Single values
By passing a to and from value, the hybrid animate will output the latest values to the provided onUpdate callback.

// Numbers
animate(0, 100, {
onUpdate: latest => console.log(latest)
})

// Colors
animate("#fff", "#000", {
duration: 2
onUpdate: latest => console.log(latest)
})

Motion values
By passing hybrid animate a React motion value, it'll be automatically updated with the latest values.

const x = motionValue(0)

animate(x, 200, { duration: 0.5 })
Objects
Objects can be animated much in the same way as HTML & SVG elements.

const values = {
x: 100,
color: "#f00"
}

animate(values, { x: 200, color: "#00f" })
Any object can be animated, for instance an Object3D from Three.js:

const camera = new THREE.Camera()

animate(camera.rotation, { y: 360 }, { duration: 10 })

Timeline sequences
The hybrid animate function can also accept complex animation sequences.

const sequence = []

animate(sequence)
A sequence is an array of animate definitions:

const sequence = [
["ul", { opacity: 1 }, { duration: 0.5 }],
["li", 100, { ease: "easeInOut" }]
]
Each definition will, by default, play one after the other.

It's possible to change when a segment will play by passing an at option, which can be either an absolute time, relative time, or label.

const sequence = [
["ul", { opacity: 1 }],
["li", { x: [-100, 0] }, { at: 1 }]
]
Each segment can accept all animate options (except repeatDelay and repeatType) to control the duration and other animation settings of that segment.

const sequence = [
["ul", { opacity: 1 }, { duration: 1 }]
]
Both type: "keyframes" and type: "spring" transitions are supported.

It's also possible to override transitions for each value individually.

const sequence = [
[
"ul",
{ opacity: 1, x: 100 },
{ duration: 1, x: { duration: 2 }}
]
]
Sequence durations are automatically calculated, but it's also possible to pass any animate option to change playback as a whole:

animate(sequence, { duration: 10, repeat: 2 })
You can also define default transition settings to be passed to all items in the sequence with the defaultTransition option:

animate(sequence, {
defaultTransition: { duration: 0.2 }
})
Any value supported by animate can be animated in sequences, mixing HTML & SVGs, motion values and objects in the same animation:

const color = motionValue("rgba(255, 0, 0, 1)")
const box = new THREE.BoxGeometry()

const sequence = [
["li", { x: 100 }],
[box.position, { y: 10 }],
[color, "#444"]
]
Stagger
When animating more than one element, it's possible to stagger animations by passing the stagger function to delay.

import { stagger, animate } from "motion"

animate(".item", { x: 300 }, { delay: stagger(0.1) })

Options
Animations can be configured with transition options. By default, provided options will affect every animating value.

animate(
element,
{ x: 100, rotate: 0 },
{ duration: 1 }
)
By providing named transitions, these can be overridden on a per-value basis:

animate(
element,
{ x: 100, rotate: 0 },
{
duration: 1,
rotate: { duration: 0.5, ease: "easeOut" }
}
)

type
type decides the type of animation to use.

Mini animate can either animate with the default keyframes animation, or spring:

import { animate } from "motion/mini"
import { spring } from "motion"

animate(
element,
{ transform: "translateX(100px)" },
{ type: spring, stiffness: 300 }
)
Hybrid animate has all animation types built-in, and can be set to "tween", "spring" or "inertia".

Tween animations are set with a duration and an easing curve.

Spring animations are either physics-based or duration-based.

Physics-based spring animations are set via stiffness, damping and mass, and these incorporate the velocity of any existing gestures or animations for natural feedback.

Duration-based spring animations are set via a duration and bounce. These don't incorporate velocity but are easier to understand.

Inertia animations decelerate a value based on its initial velocity, usually used to implement inertial scrolling.

animate("path", { pathLength: 1 }, { duration: 2, type: "tween" })
Tween
duration
Default: 0.3 (or 0.8 if multiple keyframes are defined)

The duration of the animation. Can also be used for "spring" animations when bounce is also set.

animate("ul > li", { opacity: 1 }, { duration: 1 })
ease
The easing function to use with tween animations. Accepts:

Easing function name. E.g "linear"

An array of four numbers to define a cubic bezier curve. E.g [.17,.67,.83,.67]

A JavaScript easing function, that accepts and returns a value 0-1.

These are the available easing function names:

"linear"

"easeIn", "easeOut", "easeInOut"

"circIn", "circOut", "circInOut"

"backIn", "backOut", "backInOut"

"anticipate"

When animating keyframes, ease can optionally be set as an array of easing functions to set different easings between each value:

animate(
element,
{ x: [0, 100, 0] },
{ ease: ["easeIn", "easeOut"] }
)
times
When animating multiple keyframes, times can be used to adjust the position of each keyframe throughout the animation.

Each value in times is a value between 0 and 1, representing the start and end of the animation.

animate(
element,
{ x: [0, 100, 0] },
{ times: [0, 0.3, 1] }
)
There must be the same number of times as there are keyframes. Defaults to an array of evenly-spread durations.

Spring

Time
Duration
0.5

Bounce
0.3

Use visual duration
bounce
Default: 0.25

bounce determines the "bounciness" of a spring animation.

0 is no bounce, and 1 is extremely bouncy.

Note: bounce and duration will be overridden if stiffness, damping or mass are set.

animate(
"section",
{ rotateX: 90 },
{ type: "spring", bounce: 0.25 }
)
visualDuration
If visualDuration is set, this will override duration.

The visual duration is a time, set in seconds, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

animate(
"section",
{ rotateX: 90 },
{ type: "spring", visualDuration: 0.5, bounce: 0.25 }
)
stiffness
Default: 1

Stiffness of the spring. Higher values will create more sudden movement.

animate(
"section",
{ rotate: 180 },
{ type: "spring", stiffness: 50 }
)
damping
Default: 10

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

animate(
"section",
{ rotate: 180 },
{ type: "spring", damping: 300 }
)
mass
Default: 1

Mass of the moving object. Higher values will result in more lethargic movement.

animate(
"feTurbulence",
{ baseFrequency: 0.5 },
{ type: "spring", mass: 0.5 }
)
velocity
Default: Current value velocity

The initial velocity of the spring.

animate(
".my-element",
{ rotate: 180 },
{ type: "spring", velocity: 2 }
)
restSpeed
Default: 0.1

End animation if absolute speed (in units per second) drops below this value and delta is smaller than restDelta.

animate(
".my-element",
{ rotate: 180 },
{ type: "spring", restSpeed: 2 }
)
restDelta
Default: 0.01

End animation if distance is below this value and speed is below restSpeed. When animation ends, the spring will end.

animate(
".my-element",
{ x: 200 },
{ type: "spring", restDelta: 0.5 }
)
Orchestration
delay
Default: 0

Delay the animation by this duration (in seconds).

animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
By setting delay to a negative value, the animation will start that long into the animation. For instance to start 1 second in, delay can be set to -1.

repeat
Default: 0

The number of times to repeat the transition. Set to Infinity for perpetual animation.

animate(
element,
{ backgroundColor: "#fff" },
{ repeat: Infinity, duration: 2 }
)
repeatType
Default: "loop"

How to repeat the animation. This can be either:

loop: Repeats the animation from the start.

reverse: Alternates between forward and backwards playback.

mirror: Switches animation origin and target on each iteration.

animate(
element,
{ backgroundColor: "#fff" },
{ repeat: 1, repeatType: "reverse", duration: 2 }
)
repeatDelay
Default: 0

Note: Not available in animate mini.

When repeating an animation, repeatDelay will set the duration of the time to wait, in seconds, between each repetition.

animate(
element,
{ backgroundColor: "#fff" },
{ repeat: 1, repeatDelay: 1 }
)
at
When defining animations as part of a larger sequence, each definition will start one after the other:

const sequence = [
["ul", { opacity: 1 }],
// This will start when ul opacity is 1
["li", { x: [-100, 0] }]
]
By passing at, this behaviour can be changed.

Pass a number to define a specific time:

const sequence = [
["nav", { opacity: 1 }],
// This will start 0.5 from the start of the whole timeline:
["nav", { x: 100 }, { at: 0.5 }],
]
Pass a string starting with + or - to start relative to the end of the previous animation:

const sequence = [
["nav", { opacity: 1 }],
// This will start 0.5 seconds after the previous animation:
["nav", { x: 100 }, { at: "+0.5" }],
// This will start 0.2 seconds before the end of the previous animation:
["nav li", { opacity: 1 }, { at: "-0.2" }],
]
Pass "<" to start at the same time as the previous segment:

const sequence = [
["nav", { x: 100 }, { duration: 1 }],
// This will start at the same time as the x: 100 animation
["li", { opacity: 1 }, { at: "<" }],
]
Or pass a label name to start at the same point as the original label definition:

const sequence = [
["nav", { x: 100 }, { duration: 1 }],
"my-label",
["li", { opacity: 1 }],
// my-label was defined at 1 second
["a", { scale: 1.2 }, { at: "my-label" }],
]
onUpdate
A function that's provided the latest animation values.

Note: Currently for single value and motion value animations only.

animate("#fff", "#000", {
duration: 2
onUpdate: latest => console.log(latest)
})
Controls
animate() returns animation playback controls. These can be used to pause, play, cancel, change playback speed and more.

const animation = animate(element, { opacity: 1 })

animation.time = 0.5
animation.stop()
duration
Returns the duration of the animation.

This is the duration of a single iteration of the animation, without delay or repeat options. It is read-only.

const animation = animate(element, { opacity: 0 })

const duration = animation.duration
time
Gets and sets the current time of the animation.

const animation = animate(x, 100, { duration: 1 })

// Set animation time to 0.5 seconds
animation.time = 0.5

// Get animation time
console.log(animation.time) // 0.5
speed
Gets and sets the current playback speed of the animation.

1 is normal rate.

0.5 is half rate.

2 doubles the playback rate.

-1 reverses playback.

const animation = animate(element, { opacity: 0 })

const currentSpeed = animation.speed

// Double current speed
animation.speed = currentSpeed \* 2
then()
A Promise-like API that resolves when the animation finishes:

const animation = animate(element, { opacity: 0 })

// Async/await
await animation
console.log("Animation complete")

// Promise
animation.then(() => {
console.log("Animation complete")
})
Note: When an animation finishes, a new Promise is created. If the animation is then replayed via the play() method, any old callbacks won't fire again.

pause()
Pauses the animation until resumed with play().

const animation = animate(element, { opacity: 0 })
animation.pause()
play()
Plays an animation.

If an animation is paused, it will resume from its current time.

If an animation has finished, it will restart.

animation.pause()

// Will resume from 1 second
animation.time = 1
animation.play()

// Will play from start
await animation
animation.play()
complete()
Immediately completes the animation, running it to the end state.

animation.complete()
cancel()
Cancels the animation, reverting it to the initial state.

const animation = animate(element, { opacity: 0 })
animation.cancel()
stop()
Stops the animation.

Any values being animated via the Web Animations API will be committed to the element via style.

Stopped animations cannot be restarted.

const animation = animate(element, { opacity: 0 })
animation.stop()

hover
Motion's hover function detects hover gestures, firing events when they start and end.

For legacy reasons, browsers emulate hover events from touch devices, which can lead to "stuck" UIs and other unwanted visual artefacts/broken behaviours. hover filters these fake events out.

hover(".button", (element) => {
console.log("hover started on", element)

return () => console.log("hover end")
})
hover is also:

Clean: Automatically manages event listeners

Convenient: Accepts either elements or CSS selectors for attaching multiple gestures at once

Lazy: Attaches only the event listeners needed

hover callbacks can do anything, but often they're used to start or control animations.

hover("li", (element) => {
const animation = animate(element, { rotate: 360 })

return () => animation.stop()
})

## hover can be imported into your project via "motion":

import { hover } from "motion"
Hover start
hover can detect hover gestures on either an Element/array of elements:

hover(
document.getElementById("my-id"),
() => {
console.log("my-id hovered!")
}
)
Or via a CSS selector:

hover("a", () => console.log("link hovered"))
When a hover gesture starts, the provided callback is provided both the element that's being hovered, and the triggering PointerEvent:

hover("div:nth-child(2)", (element, startEvent) => {
console.log("Hover started on", element)
console.log("At", startEvent.clientX, startEvent.clientY)
})
Hover end
The hover start function can optionally return a callback. This will be called when the hover gesture ends:

hover("a", () => {
console.log("hover start")

return (endEvent) => {
console.log("hover end")
}
})
This callback will be provided the triggering PointerEvent.

Cancelling gesture detection
hover returns a function that, when fired, will cancel all active event handlers associated with the gesture.

const cancelHover = hover(element, callback)

cancelHover()
Options
passive
Default: true

If set to false, it'll be possible to call event.preventDefault() but the gesture will be less performant. Learn more about passive events.

once
Default: false

If set to true, each provided element will fire their gesture only once.

## inView

inView detects when elements enter and leave the viewport.

inView("#carousel li", (element) => {
animate(element, { opacity: 1 })
})
Detecting when an element is in view can help creating effects like:

Animating elements when they scroll into and out of view.

Deactivating animations when they're no longer visible.

Lazy-loading content.

Automatically start/stop videos.

inView function is built on the browser's native Intersection Observer API for the best possible performance (all calculations happen off the main JavaScript thread) and a tiny filesize (just 0.5kb).

Usage
Import from "motion":

import { inView } from "motion"
inView can accept either a selector, Element, or array of Elements.

// Selector
inView("section", callback)

// Element
const box = document.getElementById("box")
inView(box, callback)
By default, the provided callback will fire just once, when the element first enters the viewport.

inView(element, () => {
console.log("Element has entered the viewport")
})
This callback is provided the matched element and an IntersectionObserverEntry object which contains information on the intersection.

inView("a", (element, info) => {
console.log("The link ", element, " has entered the viewport")
})
Leaving the viewport
A function returned from this callback will fire when the element leaves the viewport.

inView(element,
(element, enterInfo) => {
const animation = animate(element, { opacity: 1 })

    // This will fire when the element leaves the viewport
    return (leaveInfo) => animation.stop()

}
)
Additionally, the gesture will also continue to fire as the element enters/leaves the viewport.

Change viewport
By default, inView detects when the provided element(s) enter/leave the default viewport: The browser window.

But it can also detect when the element(s) enter/leave the viewport of a scrollable parent element, by passing that element to the root option:

const carousel = document.querySelector("#carousel")

inView("#carousel li", callback, { root: carousel })
Stop detection
inView returns a function that, when fired, will stop viewport detection.

const stop = inView(element, callback)

stop()
Options
root
Default: window

If provided, inView will use the root element's viewport to detect whether the target elements are in view. Otherwise defaults to the browser window.

const carousel = document.querySelector("#carousel")

inView("#carousel li", callback, { root: carousel })
margin
Default: 0

One or more margins to apply to the viewport. This will extend or contract the point at which the element is considered inside or outside the viewport.

margin can be defined in pixels or percentages. It can accept up to four values in the order of top/right/bottom/left.

inView(element, callback, { margin: "0px 100px 0px 0px" })
Positive values extend the viewport boundaries beyond the root whereas negative values will pull it in.

Note: For browser security reasons, margin won't take affect within cross-origin iframes unless root is explicitly defined.

amount
Default: "some"

The amount of the target element that needs to be within the viewport boundaries to be considered in view.

This can be defined as "some", for some of the element, or "all", for all of the element.

Additionally, it can be defined as a number proportion between 0 and 1 where 0 is "some" and 1 is "all".
