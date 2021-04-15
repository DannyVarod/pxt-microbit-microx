/**
 * Joystick example
 */

// Initialize buttons and PWM
uxRemotes.initializeYahboomRemote()

let joystickY = 0
let joystickX = 0

// Joystick buttons example
uxRemotes.onYahboomRemoteButton(uxRemotes.REMOTE_BUTTON.YAHBOOM_B3_BLUE, uxRemotes.BUTTON_STATE.RELEASED, function () {
    //uxRemotes.setYahboomRemoteVibrationSpeed(4095)
    control.waitMicros(500000)
    //uxRemotes.setYahboomRemoteVibrationSpeed(0)
})

// Joystick position example
basic.forever(function () {
    led.unplot(joystickX, joystickY)
    joystickY = Math.round(uxRemotes.joystickY() * -2 + 2)
    joystickX = Math.round(uxRemotes.joystickX() * 2 + 2)
    led.plot(joystickX, joystickY)
})
