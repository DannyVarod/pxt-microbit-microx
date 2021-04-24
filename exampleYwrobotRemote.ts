/**
 * Joystick example
 */

// Initialize remote
uxRemotes.initializeYwrobotRemote()

// Show user that the remote is on and ready
basic.showIcon(IconNames.Pitchfork)

basic.forever(function () {
    let yx: string = Math.round(uxRemotes.joystickY(512)) + ',' + Math.round(uxRemotes.joystickX(512))
    basic.showString(yx)
})

// Use speaker (or earphone socket) on joystick (Pin0 instead of from micro:bit v2)
// Potentiometer is for earphone socket volume, however, is reverse (clockwise to decrease volume)
// Switch switches between earphone socket (left) to speaker (right)
music.setBuiltInSpeakerEnabled(false)

input.onButtonPressed(Button.A, function () {
    basic.showString("A")
    uxDisplays.setAllOnboardPixels(0, 0, 0)
    uxDisplays.setOnboardPixel1D(0, 0, 0, 100)
    uxDisplays.refreshOnboardPixels()
    music.playTone(Note.C, music.beat())
})

input.onButtonPressed(Button.B, function () {
    basic.showString("B")
    uxDisplays.setAllOnboardPixels(0, 0, 0)
    uxDisplays.setOnboardPixel1D(1, 100, 0, 0)
    uxDisplays.refreshOnboardPixels()
    music.stopAllSounds()
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YWROBOT_C_GREEN, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("C")
    uxDisplays.setAllOnboardPixels(0, 0, 0)
    uxDisplays.setOnboardPixel1D(2, 0, 100, 0)
    uxDisplays.refreshOnboardPixels()
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YWROBOT_D_YELLOW, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("D")
    uxDisplays.setAllOnboardPixels(0, 0, 0)
    uxDisplays.setOnboardPixel1D(3, 100, 100, 0)
    uxDisplays.refreshOnboardPixels()
})

uxRemotes.onRemoteButton(uxRemotes.REMOTE_BUTTON.YWROBOT_JOYSTICK_Z, uxRemotes.BUTTON_STATE.PRESSED, function () {
    basic.showString("Z")
    uxDisplays.setAllOnboardPixels(0, 0, 0)
    uxDisplays.setOnboardPixel1D(4, 100, 100, 100)
    uxDisplays.refreshOnboardPixels()
})

let feedback = 0

input.onButtonPressed(Button.AB, function () {
    if (feedback <= 0) {
        feedback = 255
    } else if (feedback < 1023) {
        feedback += 256
    } else {
        feedback = 0
    }
    uxRemotes.setRemoteVibrationFeedback(feedback)
    basic.showString("AB")
    uxDisplays.setAllOnboardPixels(0, 0, 0)
    uxDisplays.setOnboardPixel1D(5, 100, 0, 100)
    uxDisplays.refreshOnboardPixels()
})
