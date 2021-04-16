/**
 * Joystick example
 */

// Initialize remote
uxRemotes.initializeYahboomRemote()

// Show user that the remote is on and ready
basic.showIcon(IconNames.Pitchfork)

// Joystick position example
basic.forever(function () {
    let yx: string = Math.round(uxRemotes.joystickY(512)) + ',' + Math.round(uxRemotes.joystickX(512))
    basic.showString(yx)
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YAHBOOM_B1_RED, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("1")
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YAHBOOM_B2_GREEN, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("2")
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YAHBOOM_B3_BLUE, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("3")
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YAHBOOM_B4_YELLOW, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("4")
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YAHBOOM_JOYSTICK_Z, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("Z")
})
